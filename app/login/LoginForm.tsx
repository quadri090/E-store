"use client";
import React, { useEffect } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Btn from "../components/Btn";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { safeUser } from "@/types";


interface LoginFormProps{
  currentUser: safeUser | null
}

const LoginForm : React.FC<LoginFormProps> = ({currentUser}) => {
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
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged In");
      }

      if (callback?.error) {
        toast.error("callback.error");
      }
    })

    // console.log(data);
  };

  if(currentUser) {
    return <p className="text-center">Logged In. Redirecting...</p>
  }

  return (
    <>
      <Heading title="Sign in to Shoppy" />
      <Btn
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => {signIn("google")}}
      />
      <hr className="bg-slate-300 w-full h-px" />
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
        label={isLoading ? "loading..." : "Login"}
        onClick={handleSubmit(onSubmit)}
      />
      <small>
        Dont have an account?{" "}
        <Link href="/register" className="underline">
          Sign Up
        </Link>
      </small>
    </>
  );
};

export default LoginForm;
