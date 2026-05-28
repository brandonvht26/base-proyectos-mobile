import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { toast } from 'sonner-native';

import { LoginUseCase } from '../../application/use-cases/LoginUseCase';
import { RegisterUseCase } from '../../application/use-cases/RegisterUseCase';
import { ForgotPasswordUseCase } from '../../application/use-cases/ForgotPasswordUseCase';
import { SupabaseAuthRepository } from '../../infrastructure/repositories/SupabaseAuthRepository';
import { useAuthStore } from '../store/authStore';

const repository = new SupabaseAuthRepository();

export const useAuth = () => {
    const { setUser } = useAuthStore();
    const router = useRouter();

    const login = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => {
            const useCase = new LoginUseCase(repository);
            return useCase.execute(email, password);
        },
        onSuccess: (user) => {
            setUser(user);
            toast.success('Bienvenido de vuelta');
            router.replace('/main');
        },
        onError: (error: Error) => {
            toast.error(error.message ?? 'Error al iniciar sesión');
        },
    });

    const register = useMutation({
        mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) => {
            const useCase = new RegisterUseCase(repository);
            return useCase.execute(email, password, name);
        },
        onSuccess: (user) => {
            setUser(user);
            toast.success('Cuenta creada exitosamente');
            router.replace('/main');
        },
        onError: (error: Error) => {
            toast.error(error.message ?? 'Error al registrarse');
        },
    });

    const forgotPassword = useMutation({
        mutationFn: ({ email }: { email: string }) => {
            const useCase = new ForgotPasswordUseCase(repository);
            return useCase.execute(email);
        },
        onSuccess: () => {
            toast.success('Revisa tu correo para recuperar tu contraseña');
            setTimeout(() => {
                router.replace('/auth/login');
            }, 1500);
        },
        onError: (error: Error) => {
            toast.error(error.message ?? 'Error al enviar el correo');
        },
    });

    const logout = async () => {
        try {
            await repository.signOut();
            setUser(null);
            toast.success('Sesión cerrada');
            router.replace('/auth/login');
        } catch (error: any) {
            toast.error(error.message ?? 'Error al cerrar sesión');
        }
    };

    return { login, register, forgotPassword, logout };
};