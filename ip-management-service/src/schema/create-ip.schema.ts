import { z } from "zod";

export const createIPSchema = z.object({
  label: z.string(),
  ip: z.string().ip(),
  type: z.enum(["ipv4", "ipv6"]),
  comment: z.string().optional(),
});
