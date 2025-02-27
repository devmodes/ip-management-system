import { useSigninMutation } from "@services/auth-service";
import { ChangeEvent, useEffect, useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export const useLoginForm = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [signin, { data, isSuccess, isError, isLoading, error }] =
    useSigninMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await signin(form);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [isError]);

  return {
    form,
    handleChange,
    handleSubmit,
  };
};
