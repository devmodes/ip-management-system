import { useSigninMutation } from "@services/auth-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authenticate } from "@store/reducers/auth";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export const useLoginForm = (defaultValues?: LoginForm) => {
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
      const response = await signin(data).unwrap();

      authenticate({
        user: response.user,
        token: response.token,
      });
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
