import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateIPAddressMutation,
  useUpdateIPAddressMutation,
} from "@store/api/ip-address-api";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ipAddressFormSchema = z.object({
  label: z.string().min(1, { message: "Label is required" }),
  ip: z.string().ip(),
  comment: z.string().optional(),
});

type IPAddressForm = z.infer<typeof ipAddressFormSchema>;

type IPAddressFormArgs = {
  defaultValues?: IPAddressForm;
  id?: string;
};

export const useIPAddressForm = ({ defaultValues, id }: IPAddressFormArgs) => {
  const [updateRecord] = useUpdateIPAddressMutation();
  const [createRecord] = useCreateIPAddressMutation();
  const form = useForm<IPAddressForm>({
    resolver: zodResolver(ipAddressFormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = async (data: IPAddressForm) => {
    try {
      if (id) {
        const body = {
          id,
          label: data.label,
          ip: data.ip,
          comment: data.comment || "",
        };

        await updateRecord(body);
      } else {
        await createRecord({
          label: data.label,
          ip: data.ip,
          comment: data.comment || "",
        });
        data;
      }
    } catch (error: any) {}
  };

  return {
    form,
    onSubmit: handleSubmit(onSubmit),
    isSubmitting,
    onSuccess: isSubmitSuccessful,
  };
};
