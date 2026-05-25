import { useState } from 'react';
import { toast } from 'sonner-native';
import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { RegisterUseCase } from '../../application/use-cases/RegisterUseCase';
import { ForgotPasswordUseCase } from '../../application/use-cases/ForgotPasswordUseCase';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/SupabaseAuthRepository';
import { useAuthStore } from '../store/authStore';

const repository = new SupabaseAuthRepository();

export const useAuth = () => {
    const { setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const useCase = new LoginUseCase(repository);
            const user = await useCase.execute(email, password);
            setUser(user);
            toast.success('Bienvenido de vuelta');
        } catch (error: any) {
            toast.error(error.message ?? 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        try {
            const useCase = new RegisterUseCase(repository);
            const user = await useCase.execute(email, password, name);
            setUser(user);
            toast.success('Cuenta creada exitosamente');
        } catch (error: any) {
            toast.error(error.message ?? 'Error al registrarse');
        } finally {
            setIsLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        setIsLoading(true);
        try {
            const useCase = new ForgotPasswordUseCase(repository);
            await useCase.execute(email);
            toast.success('Revisa tu correo para recuperar tu contraseña');
        } catch (error: any) {
            toast.error(error.message ?? 'Error al enviar el correo');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            const { signOut } = repository;
            await repository.signOut();
            setUser(null);
            toast.success('Sesión cerrada');
        } catch (error: any) {
            toast.error(error.message ?? 'Error al cerrar sesión');
        }
    };

    return { login, register, forgotPassword, logout, isLoading };
};