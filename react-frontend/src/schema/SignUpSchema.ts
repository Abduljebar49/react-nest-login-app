import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string().min(3,"Name must contain more than 3 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .max(32, "The password must be a maximun 32 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
        "must contain contain a character, a number and a letter"
    ),
  confirmPassword: z.string(),
})    .refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignUpModel = z.infer<typeof SignUpSchema>;
export default SignUpSchema;