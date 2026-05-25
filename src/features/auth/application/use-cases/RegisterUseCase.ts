import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { User } from '../../domain/entities/User';
import { AppError } from '../../../../shared/domain/errors/AppError';

export class RegisterUseCase {
    constructor(private readonly authRepository: IAuthRepository) { }

    async execute(email: string, password: string, name: string): Promise<User> {
        if (!email || !password || !name) {
            throw new AppError('Todos los campos son requeridos', 'AUTH_MISSING_FIELDS');
        }
        if (password.length < 8) {
            throw new AppError('La contraseña debe tener al menos 8 caracteres', 'AUTH_WEAK_PASSWORD');
        }
        try {
            return await this.authRepository.signUp(email, password, name);
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError('No se pudo crear la cuenta', 'AUTH_REGISTER_FAILED');
        }
    }
}