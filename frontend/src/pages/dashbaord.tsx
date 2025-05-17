import { useEffect, useState } from "react";
import Loading from "../components/loading";
import * as pernApi from "../network/pern_api";
import type { Transaction as TransactionModel } from "../model/transaction";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import Info from "../components/info";
import Stats from "../components/stats";
import Chart from "../components/Chart";
import DoughnutChart from "../components/DoughnutChart";

const Dashbaord = () => {
  const [isloading, setIsLoading] = useState(false);
  const [data, setData] = useState<TransactionModel[]>([]);
  const navigate = useNavigate();

  const { user } = useStore((state) => state);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
    const fetchTransactionStatistique = async () => {
      try {
        setIsLoading(true);
        const data = await pernApi.fetchStat();
        // console.log(data);

        // Normalisation de la réponse
        const normalizedData = Array.isArray(data) ? data : [data];
        setData(normalizedData);
        console.log(data);

        // setData(data);
      } catch (error) {
        console.log(error);

        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactionStatistique();
  }, []);

  if (isloading) {
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <Info title="Dashboard" subTitle="Monitor your finance" />
      <Stats />
      <div className="w-full flex flex-col gap-10 items-center md:flex md:flex-row  md:items-center lg:flex  ">
        <Chart />
        <DoughnutChart />
      </div>
    </div>
  );
};

export default Dashbaord;
