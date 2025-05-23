import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { LoginCredentiels } from "../../network/pern_api";
import * as pernApi from "../../network/pern_api";
import type { User } from "../../model/user";
import { useEffect, useState } from "react";
import useStore from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BiLoader } from "react-icons/bi";


const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { user, setCredentails } = useStore((state) => state);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<LoginCredentiels>();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = async (input: LoginCredentiels) => {
    setLoading(true);

    try {
      // const user = await pernApi.signIn(input);
      const user = await pernApi.signIn(input);
      console.log(user);

      // const {user:userInfo,token}=response
      // if (user) {
      //   toast.success("Login successful!");
      // }
      if (user.token) {
        localStorage.setItem("token", user.token);
        toast.success(user.message);
        setCredentails(user.user);
        // onLoginSuccessFull(user.user);
        navigate("/");
        // setTimeout(() => {

        // }, 5000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-[450px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
        <div className="p-6 md:-8">
          <CardHeader className="py-0">
            <CardTitle className="mb-8 text-center dark:text-white">
              Se connecter
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-8 flex gap-3  flex-col">
                <label htmlFor="email" className="text-black-100/50">
                  Email :
                </label>
                <div>
                  <input
                    {...register("email", { required: "email is required" })}
                    className={`border border-gray-100 rounded outline-none px-2 py-3 w-full ${
                      errors.email ? "border-red-600" : ""
                    }`}
                    placeholder="Entrer email"
                  />
                  {errors.email && (
                    <span className="text-red-600 text-sm font-semibold">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-8 flex gap-3  flex-col">
                <label htmlFor="password" className="text-black-100/50">
                  Password:
                </label>
                <div>
                  <input
                    {...register("password", {
                      required: "password is required",
                    })}
                    className={`border border-gray-100 rounded outline-none px-2 py-3 w-full ${
                      errors.password ? "border-red-600" : ""
                    }`}
                    placeholder="Entrer password"
                    type="password"
                  />
                  {errors.password && (
                    <span className="text-sm font-semibold text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-8 space-y-6">
                {/* <SocialAuth isloading={loading} setLoading={setLoading} /> */}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 text-amber-50 rounded-full px-3 py-3 flex justify-center cursor-pointer hover:bg-blue-600 hover:text-blue-50"
              >
                {loading ? (
                  <BiLoader className="text-2xl text-white animate-spin" />
                ) : (
                  " Se connecter"
                )}
              </button>
            </form>
          </CardContent>
        </div>
        <CardFooter className="justify-center gap-2">
          <p>Don't have an account ?</p>
          <Link
            to="/signup"
            className="text-sm font-semibold text-violet-600 hover:underline"
          >
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
