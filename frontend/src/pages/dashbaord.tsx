import { useEffect, useState } from "react";
import Loading from "../components/loading";
import * as pernApi from "../network/pern_api";
import type { DashboardData } from "../network/pern_api";

import { data, useNavigate } from "react-router-dom";
import useStore from "../store";
import Info from "../components/info";
import Stats from "../components/stats";
import Chart from "../components/Chart";
import DoughnutChart from "../components/DoughnutChart";
import Transaction from "../components/Transaction";
import { toast } from "sonner";

const Dashbaord = () => {
  const [isloading, setIsLoading] = useState(true);

  const [fetchData, setFetchData] = useState<DashboardData | null>(null);

  const navigate = useNavigate();

  const { user } = useStore((state) => state);

  if (!user) {
    navigate("/signin");
    return;
  }

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  useEffect(() => {
    // setIsLoading(true);
    const fetchDashboardStats = async () => {
      // const URL = `/transactions/dashboard`;
      try {
        const data = await pernApi.fetchStat();

        
        setFetchData(data);
        console.log(data);
        
      } catch (error) {
       
        toast.error("Erreur API",{
        description: error instanceof Error ? error.message : "Une erreur inconnue est survenue.",
        })
         
      } finally {
        setIsLoading(false);
      }
    };
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);
  console.log(fetchData);

 

  if (isloading) {
    return (
      <div className="flex items-center justify-center min-w-full h-[80vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <Info title="Dashboard" subTitle="Monitor your finance" />
      {fetchData && (
        <Stats
          dt={{
            balance: fetchData.availableBalance,
            income: fetchData.totalIncome,
            expense: fetchData.totalExpense,
          }}
        />
     
      )}
      <div className="w-full flex flex-col gap-10 items-center md:flex md:flex-row  md:items-center lg:flex  ">
       { fetchData?.chartData && <Chart data={fetchData?.chartData} />}
      
      { fetchData?.totalIncome > 0  && (  <DoughnutChart dt={{
        balance:fetchData?.availableBalance,
        income:fetchData.totalIncome,
        expense:fetchData.totalExpense
      }}  />)}
      </div>
      <div>
        <Transaction />
      </div>
    </div>
  );
};

export default Dashbaord;
