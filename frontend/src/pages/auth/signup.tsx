import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../../store";
import { RegisterSchema } from "../../utilities/validateData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
const SignUp = () => {
  const { user } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const onSubmit = async (data: string) => {
    console.log(data);
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
        <div className="p-6 md:-8">
          <CardHeader className="py-0">
            <CardTitle className="mb-8 text-center dark:text-white">Create an Account</CardTitle>
          </CardHeader>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
