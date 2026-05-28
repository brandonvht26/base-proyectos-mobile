import { z } from 'zod';

// ─── Esquemas de campo individuales ────────────────────────────── //

const emailField = z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido');

const passwordField = z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'Mínimo 8 caracteres');

const strongPasswordField = passwordField
    .min(8, 'Mínimo 8 caracteres')
    .max(30, 'Máximo 30 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[\d\W_]/, 'Debe contener al menos un número o símbolo especial');

const nameField = z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'Mínimo 2 caracteres')
    .max(40, 'Máximo 40 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ'\s]+$/, 'Solo se permiten letras, espacios y apóstrofes');

const confirmPasswordField = z
    .string()
    .min(1, 'Confirma tu contraseña');

// ─── Esquemas por campo (para validación individual) ───────────── //

export const fieldSchemas = {
    email: emailField,
    password: passwordField,
    strongPassword: strongPasswordField,
    name: nameField,
    confirmPassword: confirmPasswordField,
} as const;

// ─── Esquemas de formulario ────────────────────────────────────── //

export const loginSchema = z.object({
    email: emailField,
    password: passwordField,
});

export const registerSchema = z
    .object({
        name: nameField,
        email: emailField,
        password: strongPasswordField,
        confirmPassword: confirmPasswordField,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
    });

export const forgotPasswordSchema = z.object({
    email: emailField,
});

// ─── Tipos inferidos ───────────────────────────────────────────── //

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
