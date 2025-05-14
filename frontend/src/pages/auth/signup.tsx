import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../../store";
import type { pernInput } from "../../network/pern_api";
// import { RegisterSchema } from "../../utilities/validateData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { User } from "../../model/user";
import SocialAuth from "../../components/socialAuth";

interface SignProps {
  onSignUpSuccessFul: (user: User) => void;
}
const SignUp = ({ onSignUpSuccessFul }: SignProps) => {
  const { user } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<pernInput>();
  // {
  //     resolver: zodResolver(RegisterSchema),
  //   }
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = async (input: pernInput) => {
    console.log(input);
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
        <div className="p-6 md:-8">
          <CardHeader className="py-0">
            <CardTitle className="mb-8 text-center dark:text-white">
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* <input {...register("email", { required: true })} />
              <input {...register("firstName", { required: true })} />
              <input {...register("lastName", { required: true })} />
              <input {...register("accounts", { required: true })} /> */}

              <div className="mb-8 space-y-6">
                <SocialAuth isloading={loading} setLoading={setLoading} />
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
