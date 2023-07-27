import * as z from 'zod';

export const RegisterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
