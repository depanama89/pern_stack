import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors'
import morgan from "morgan"
import userRouter from "./routers/users"
import authRouter from "./routers/authRoute"
import accountsRouter from "./routers/accounts"
import transactionsRouter from "./routers/transactions"
import createHttpError,{isHttpError} from "http-errors";
import { error } from "console";
import authMiddleware from "./middlewares/authMiddleware";

const app = express();

// app.use(cors(corsOptions))
app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api-v1/auth",authRouter)
app.use("/api-v1/users",authMiddleware,userRouter)
app.use("/api-v1/transactions",transactionsRouter)
app.use("/api-v1/accounts",authMiddleware,accountsRouter)
app.get("/",(req,res)=>{
   res.send("Hello,world")

})

app.use((req,res,next)=>{
    next(createHttpError(404,"la route non trouver"))
})

app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
    console.log(error);
    let errorMessage="An unknown error occured"
    let statusCode=500
    if(isHttpError(error)){
        statusCode=error.status
        errorMessage=error.message
    }

    res.status(statusCode).json({error:errorMessage})
    
})


export default app