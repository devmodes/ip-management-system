import { useSigninMutation } from "@services/auth-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
    formState: { isSubmitting },
  } = form;

  const [signin] = useSigninMutation();

  const onSubmit = async (data: LoginForm) => {
    await signin(data);
  };

  return {
    form,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
