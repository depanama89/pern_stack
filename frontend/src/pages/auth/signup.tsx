// import {
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../../store";
import type { SignUpCredentials } from "../../network/pern_api";
// import { RegisterSchema } from "../../utilities/validateData";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
// import type { User } from "../../model/user";
import * as pernApi from "../../network/pern_api";
// import SocialAuth from "../../components/socialAuth";
import { toast } from "sonner";
import { BiLoader } from "react-icons/bi";

// type methode de payement



const SignUp = () => {
  const { user } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<SignUpCredentials>({
    defaultValues: {
      accounts: [],
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = async (input: SignUpCredentials) => {
    // console.log(input);
    setLoading(true);
    try {
      const newUser = await pernApi.signUp(input);

      if (newUser) {
        toast.success("Enregistrement effectuer avec success!");
        navigate("/signin");
      // onSignUpSuccessFul(newUser);
      }

      
    } catch (error) {
      toast.error("Enregistrement échoué");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen py-10">
      <Card className="w-[750px] bg-white dark:bg-black/20 shadow-md overflow-hidden">
        <div className="p-6 md:-8">
          <CardHeader className="py-0">
            <CardTitle className="mb-8 text-center dark:text-white">
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col "
            >
              <div className="flex  justify-between gap-4">
                <div className="flex-1">
                  {" "}
                  <div className="mb-8 flex gap-3  flex-col">
                    <label htmlFor="email" className="text-black-100/50">
                      Email :
                    </label>
                    <input
                      {...register("email", { required: true })}
                      className="border border-gray-100 rounded outline-none px-2 py-3 w-full"
                      placeholder="Entrer email"
                    />
                  </div>
                  <div className="mb-8 flex gap-3  flex-col ">
                    <label htmlFor="firstname" className="text-black-100/50">
                      FirstName:
                    </label>
                    <input
                      {...register("firstname", { required: true })}
                      className="border border-gray-100 rounded outline-none px-2 py-3 w-full"
                      placeholder="FirstName"
                    />
                  </div>
                  <div className="mb-8 flex gap-3  flex-col">
                    <label htmlFor="lastname" className="text-black-100/50">
                      LastName:
                    </label>
                    <input
                      {...register("lastname", { required: true })}
                      className="border border-gray-100 rounded outline-none px-2 py-3 w-full"
                      placeholder="Entrer lastname"
                    />
                  </div>
                  <div className="mb-8 flex gap-3  flex-col">
                    <legend className="flex flex-col gap-3">
                      <label htmlFor="">
                        Choissir une methode the payement
                      </label>
                      <label
                        htmlFor="accounts"
                        className="text-black-100/50 flex gap-3 items-center"
                      >
                        Cash :
                        <input
                          {...register("accounts")}
                          type="checkbox"
                          value="cash"
                          className="px-3 py-3 w-3 h-3 shadow-2xl border border-gray-400"
                        />
                      </label>
                      <label
                        htmlFor="accounts"
                        className="text-black-100/50 flex gap-3 items-center"
                      >
                        Carte:
                        <input
                          {...register("accounts")}
                          type="checkbox"
                          value="carte"
                          className="px-3 py-3 w-3 h-3 shadow-2xl border border-gray-400"
                        />
                      </label>
                      <label
                        htmlFor="accounts"
                        className="text-black-100/50 flex gap-3 items-center"
                      >
                        banque:
                        <input
                          {...register("accounts")}
                          type="checkbox"
                          value="banque"
                          className="px-3 py-3 w-3 h-3 shadow-2xl border border-gray-400"
                        />
                      </label>
                      {errors.accounts && (
                        <span className="text-red-500 text-sm">
                          Veuillez choisir au moins une méthode
                        </span>
                      )}
                    </legend>
                  </div>
                  <div className="mb-8 flex gap-3  flex-col">
                    <label htmlFor="password" className="text-black-100/50">
                      Password:
                    </label>
                    <input
                      {...register("password", { required: true })}
                      className="border border-gray-100 rounded outline-none px-2 py-3 w-full"
                      placeholder="Entrer password"
                      type="password"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-8 flex gap-3  flex-col">
                    <label htmlFor="lastname" className="text-black-100/50">
                      Contact:
                    </label>
                    <input
                      {...register("contact", { required: true })}
                      className="border border-gray-100 rounded outline-none px-2 py-3 w-full"
                      placeholder="Entrer contact"
                    />
                  </div>
                  <div className="mb-8 flex gap-3  flex-col">
                    <label htmlFor="provider" className="text-black-100/50">
                      Provider:
                    </label>
                    <input
                      {...register("provider")}
                      className="border border-gray-100 rounded outline-none px-2 py-3 w-full"
                      placeholder="Entrer provider"
                      type="text"
                    />
                  </div>
                  <div className="mb-8 flex gap-3  flex-col">
                    <label htmlFor="country" className="text-black-100/50">
                      Country:
                    </label>
                    <input
                      {...register("country")}
                      className="border border-gray-100 rounded outline-none px-2 py-3 w-full"
                      placeholder="Entrer country"
                      type="text"
                    />
                  </div>
                  <div className="mb-8 flex gap-3  flex-col">
                    <label htmlFor="currency" className="text-black-100/50">
                      Currency:
                    </label>
                    <input
                      {...register("currency")}
                      className="border border-gray-100 rounded outline-none px-2 py-3 w-full"
                      placeholder="Entrer currency"
                      type="text"
                    />
                  </div>

                  <div className="mb-8 space-y-6">
                    {/* <SocialAuth isloading={loading} setLoading={setLoading} /> */}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 text-amber-50 rounded-full px-3 py-3 flex justify-center cursor-pointer hover:bg-blue-600 hover:text-blue-50"
              >
                {loading ? (
                  <BiLoader className="text-2xl text-white animate-spin" />
                ) : (
                  " Sauvegarder"
                )}
              </button>
            </form>
          </CardContent>
        </div>
        <CardFooter className="justify-center gap-2">
          <p>Already have an account ?</p>
          <Link
            to="/signin"
            className="text-sm font-semibold text-violet-600 hover:underline"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
