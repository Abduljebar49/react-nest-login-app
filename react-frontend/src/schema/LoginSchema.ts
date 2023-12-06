import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .max(32, "The password must be a maximun 32 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
        "must contain contain a character, a number and a letter"
    ),
});

export type LoginModel = z.infer<typeof LoginSchema>;
export default LoginSchema;