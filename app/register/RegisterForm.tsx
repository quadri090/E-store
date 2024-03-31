"use client";
import React, { useEffect } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import Btn from "../components/Btn";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import { safeUser } from "@/types";


interface RegisterFormProps{
  currentUser: safeUser | null
}

const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {
  const router = useRouter();

  useEffect(() => {
    if(currentUser) {
      router.push('/cart')
      router.refresh()
    }
  }, [])

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account Created");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("LoggedIn");
          }

          if (callback?.error) {
            toast.error("callback.error");
          }
        });
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
    // console.log(data);
  };

  if(currentUser) {
    return <p className="text-center">Logged In. Redirecting...</p>
  }


  return (
    <>
      <Heading title="Sign up for Shoppy" />
      <Btn
        outline
        label="Sign Up with Google"
        icon={AiOutlineGoogle}
        onClick={() => {signIn("google")}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Btn
        label={isLoading ? "loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />
      <small>
        Already Have an account?{" "}
        <Link href="/login" className="underline">
          Log In
        </Link>
      </small>
    </>
  );
};

export default RegisterForm;
