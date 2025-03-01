import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authenticate } from "@store/reducers/auth";
import { User } from "@lib/types/user";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@hooks/useAppStore";
import { useSigninMutation } from "@store/api/auth-api";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginFormSchema>;

type ResponseType = {
  user: User;
  token: string;
};

export const useLoginForm = (defaultValues?: LoginForm) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  const [signin] = useSigninMutation();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res: ResponseType = await signin(data).unwrap();
      dispatch(
        authenticate({
          user: res.user,
          token: res.token,
        })
      );

      navigate("/app");
    } catch (error: any) {
      if (error.status === 401) {
        setError("email", { message: error.data?.message });
      }
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
