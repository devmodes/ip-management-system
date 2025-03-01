import { z } from "zod";

export const createIPSchema = z.object({
  label: z.string(),
  ip: z.string().ip(),
  comment: z.string().optional(),
});
