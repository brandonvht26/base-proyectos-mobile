import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import { AppError } from '../../../../shared/domain/errors/AppError';

export class LoginUseCase {
    constructor(private readonly authRepository: IAuthRepository) { }

    async execute(email: string, password: string): Promise<User> {
        if (!email || !password) {
            throw new AppError('Email y contraseña son requeridos', 'AUTH_MISSING_FIELDS');
        }
        try {
            return await this.authRepository.signIn(email, password);
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError('Credenciales incorrectas', 'AUTH_INVALID_CREDENTIALS');
        }
    }
}