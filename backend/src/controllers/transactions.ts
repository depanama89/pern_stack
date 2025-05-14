import { RequestHandler } from "express";
import { pool } from "../db/db";
import createHttpError from "http-errors";
import { getMonthName } from "../middlewares/utilities";

export const getAllTransactions: RequestHandler = async (req, res, next) => {
  try {
    const today = new Date();

    const _sevenDaysAgo = new Date(today);

    _sevenDaysAgo.setDate(today.getDate() - 7);

    const sevenDaysAgo = _sevenDaysAgo.toISOString().split("T")[0];

    const { df, dt, s } = req.query as { df?: string; dt: string; s: string };

    const userId = req.user?.userId;

    const startDate = new Date(df || sevenDaysAgo);

    const endDate = new Date(dt || new Date());

    const transactions = await pool.query({
      text: `SELECT * FROM tbltransaction WHERE user_id=$1 AND createdat BETWEEN $2 AND $3 AND (description ILIKE '%' || $4 || '%' OR status ILIKE '%' || $4 || '%' OR source ILIKE '%' || $4 || '%') ORDER BY id DESC `,
      values: [userId, startDate, endDate, s],
    });

    res.status(200).json({
      status: "success",
      data: transactions.rows,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

// export const getDashboardInformation: RequestHandler = async (
//   req,
//   res,
//   next
// ) => {
//   try {
//     const {userId}=req.user!
    
//     const transactionsResult= await pool.query({
//         text:`SELECT type,SUM(amount) AS totalAmount 
//              FROM tbltransaction 
//              WHERE user_id=$1 
//              GROUP BY type`,
//         values:[userId]
//     })

//     const {totalIncome ,totalExpense} = transactionsResult.rows.reduce(
//         (acc,row)=>{
//             const amount = parseFloat(row.totalAmount);
//         }
//     )

    

    

    // const transactions=transactionsResult.rows

    // transactions.forEach((transaction)=>{
    //     if(transaction.type === "income"){
    //         totalIncome +=transaction.totalAmount
    //     }else{
    //         totalExpense += transaction.totalAmount
    //     }
    // })


//     const availableBalance=totalIncome - totalExpense

//      // Aggregate transactions to sum by type and group by month
//      const year= new Date().getFullYear()
//      const startDate = new Date(year,0,1)
//      const endDate=new Date(year,11,31,23,59,59)

//      const result = await pool.query({
//         text:` SELECT EXTRACT(MONTH FROM createdat) AS month,type,SUM(amount) AS totalAmount FROM tbltransaction WHERE user_id=$1 AND createdat BETWEEN $2 AND $3 GROUP BY EXTRACT(MONTH FROM createdat), type`,
//         values:[userId,startDate,endDate]
//      })

//     //  const data=new Array(12).fill(null).map((_,index)=>{
//     //     const monthData= result.rows.filter(
//     //         (item)=>parseInt(item.month)== index + 1
//     //     )
//     //  })

//     const data=Array.from({length:12},(_,index) =>{
//         const monthData= result.rows.filter(item=>parseInt(item.month) ===index+1)
    
//      const income=monthData.find((item)=>item.type === "income")?.totalAmount || 0

//      const expense = monthData.find((item)=>item.type === "expense")?.totalAmount || 0
    
//     return {
//         label :getMonthName(index),
//         income,
//         expense
//     }
    
//     })

//     const lastTransactionsResult= await pool.query({
//         text:`SELECT * FROM tbltransaction WHERE user_id=$1 ORDER BY id DESC LIMIT 5`,
//         values:[userId]
//     })

//     const lastTransactions=lastTransactionsResult.rows

//     const lastAccountResult= await pool.query({
//         text:`SELECT * FROM tblaccount WHERE user_id=$1 ORDER BY id DESC  LIMIT 4`,
//         values:[userId]
//     })

//     const lastAccount = lastAccountResult.rows

//     res.status(200).json({
//         status:"success",
//         availableBalance,
//         totalIncome,
//         totalExpense,
//         chartData:data,
//         lastTransactions,
//         lastAccount
//     })
//   } catch (error) {
//     next(error);
//   }
// };

export const getDashboardInformation: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req.user!;

    // 1. Calcul des totaux
    const transactionsResult = await pool.query({
      text: `SELECT type, SUM(amount) AS totalAmount 
             FROM tbltransaction 
             WHERE user_id=$1 
             GROUP BY type`,
      values: [userId]
    });

    const { totalIncome, totalExpense } = transactionsResult.rows.reduce(
      (acc, row) => {
        const amount = parseFloat(row.totalamount); // Notez le lowercase 'totalamount'
        if (row.type === "income") acc.totalIncome += amount;
        else acc.totalExpense += amount;
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );

    const availableBalance = totalIncome - totalExpense;

    // 2. Données par mois
    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const monthlyResult = await pool.query({
      text: `SELECT 
               EXTRACT(MONTH FROM createdat)::INTEGER AS month,
               type,
               SUM(amount)::FLOAT AS totalAmount 
             FROM tbltransaction 
             WHERE user_id=$1 AND createdat BETWEEN $2 AND $3 
             GROUP BY EXTRACT(MONTH FROM createdat), type`,
      values: [userId, startDate, endDate]
    });

    // 3. Transformation des données mensuelles
    const data = Array.from({ length: 12 }, (_, index) => {
      const monthNumber = index + 1;
      const monthData = monthlyResult.rows.filter(
        row => row.month === monthNumber
      );

      const incomeEntry = monthData.find(row => row.type === "income");
      const expenseEntry = monthData.find(row => row.type === "expense");

      return {
        label: getMonthName(index),
        income: incomeEntry ? parseFloat(incomeEntry.totalamount) : 0,
        expense: expenseEntry ? parseFloat(expenseEntry.totalamount) : 0
      };
    });

    // 4. Dernières transactions et comptes
    const [lastTransactionsResult, lastAccountResult] = await Promise.all([
      pool.query({
        text: `SELECT * FROM tbltransaction 
               WHERE user_id=$1 
               ORDER BY createdat DESC 
               LIMIT 5`,
        values: [userId]
      }),
      pool.query({
        text: `SELECT * FROM tblaccount 
               WHERE user_id=$1 
               ORDER BY createdat DESC 
               LIMIT 4`,
        values: [userId]
      })
    ]);

    // 5. Réponse
    res.status(200).json({
      status: "success",
      availableBalance,
      totalIncome,
      totalExpense,
      chartData: data,
      lastTransactions: lastTransactionsResult.rows,
      lastAccount: lastAccountResult.rows
    });
  } catch (error) {
    next(error);
  }
};

export const addTransaction: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.user!;
    const { account_id } = req.params;
    const { description, source, amount } = req.body;

    if (!(description || source || amount)) {
      // res.status(403).json({
      //     status:'failed',
      //     message:"Provide Required Fields !"
      // })
      throw createHttpError(403, "Provide Required Fields !");
    }

    if (Number(amount) <= 0) {
      // res.status(403).json({
      //     status:'failed',message:'Amount should be grater than 0.'
      // })
      throw createHttpError(403, "Amount should be grater than 0.");
    }

    const result = await pool.query({
      text: `SELECT * FROM tblaccount WHERE id=$1`,
      values: [account_id],
    });

    const accountInfo = result.rows[0];

    if (!accountInfo) {
      throw createHttpError(404, "Invalid account information.");
    }

    if (
      accountInfo.account_balence <= 0 ||
      accountInfo.account_balance < Number(amount)
    ) {
      throw createHttpError(
        403,
        "Transaction failed, Insifficient account balance."
      );
    }

    // begin Transaction
    await pool.query("BEGIN");

    await pool.query({
      text: `UPDATE tblaccount SET account_balance=account_balance - $1,updatedat=CURRENT_TIMESTAMP WHERE id=$2`,
      values: [amount, account_id],
    });

    await pool.query({
      text: `INSERT INTO tbltransaction(user_id,description,type,status,amount,source) VALUES($1,$2,$3,$4,$5,$6)`,
      values: [userId, description, "expense", "Completed", amount, source],
    });

    await pool.query("COMMIT");

    res.status(200).json({
      status: "success",
      message: "Transaction completes successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const transfertMoneyToAccount: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req.user!;
    const { from_account, to_account, amount } = req.body;

    if (!(from_account || to_account || amount)) {
      throw createHttpError(403, "Provide Riquered Fields");
    }

    const newAmount = Number(amount);

    if (newAmount <= 0) {
      throw createHttpError(403, "Amount shouls be grater tahn 0. ");
    }

    const fromAccountResult = await pool.query({
      text: `SELECT * FROM tblaccount WHERE id =$1`,
      values: [from_account],
    });
    const fromAccount = fromAccountResult.rows[0];

    if (!fromAccount) {
      throw createHttpError(404, "Account information not found.");
    }

    if (newAmount > fromAccount.account_balance) {
      throw createHttpError(
        403,
        "Transfert failed. Insufficient account balance."
      );
    }

    await pool.query("BEGIN");

    //transfert to account

    const toAccount = await pool.query({
      text: `UPDATE tblaccount SET account_balance=account_balance + $1, updatedat=CURRENT_TIMESTAMP WHERE id=$2 RETURNING * `,
      values: [newAmount, to_account],
    });

    const descriptiont = `Transfer (${fromAccount.account_name} - ${toAccount.rows[0].account_name})`;

    await pool.query({
      text: `INSERT INTO tbltransaction(user_id,description,type,status,amount,source) VALUES($1,$2,$3,$4,$5,$6)`,
      values: [
        userId,
        descriptiont,
        "incone",
        "Completed",
        amount,
        toAccount.rows[0].account_name,
      ],
    });

    await pool.query("COMMIT");

    res.status(201).json({
      status: "success",
      message: "Transfer completed successfully",
    });
  } catch (error) {
    next(error);
  }
};
