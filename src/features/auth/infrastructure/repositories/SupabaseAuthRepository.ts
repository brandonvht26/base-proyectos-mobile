import { supabase } from '../../../../shared/infrastructure/supabase/client';
import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import { AppError } from '../../../../shared/domain/errors/AppError';

export class SupabaseAuthRepository implements IAuthRepository {
    async signIn(email: string, password: string): Promise<User> {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new AppError(error.message, 'AUTH_SIGNIN_ERROR');
        const u = data.user;
        return {
            id: u.id,
            email: u.email ?? '',
            name: u.user_metadata?.name ?? 'Usuario',
            avatarUrl: u.user_metadata?.avatar_url,
        };
    }

    async signUp(email: string, password: string, name: string): Promise<User> {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });
        if (error) throw new AppError(error.message, 'AUTH_SIGNUP_ERROR');
        const u = data.user!;
        return {
            id: u.id,
            email: u.email ?? '',
            name: u.user_metadata?.name ?? name,
        };
    }

    async resetPassword(email: string): Promise<void> {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw new AppError(error.message, 'AUTH_RESET_ERROR');
    }

    async signOut(): Promise<void> {
        const { error } = await supabase.auth.signOut();
        if (error) throw new AppError(error.message, 'AUTH_SIGNOUT_ERROR');
    }

    async getCurrentUser(): Promise<User | null> {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return null;
        const u = session.user;
        return {
            id: u.id,
            email: u.email ?? '',
            name: u.user_metadata?.name ?? 'Usuario',
            avatarUrl: u.user_metadata?.avatar_url,
        };
    }
}