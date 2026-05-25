import { User } from '../entities/User';

export interface IAuthRepository {
    signIn(email: string, password: string): Promise<User>;
    signUp(email: string, password: string, name: string): Promise<User>;
    resetPassword(email: string): Promise<void>;
    signOut(): Promise<void>;
    getCurrentUser(): Promise<User | null>;
}