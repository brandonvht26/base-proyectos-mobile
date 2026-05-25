import { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import { AppError } from '../../../../shared/domain/errors/AppError';

export class ForgotPasswordUseCase {
    constructor(private readonly authRepository: IAuthRepository) { }

    async execute(email: string): Promise<void> {
        if (!email) {
            throw new AppError('El email es requerido', 'AUTH_MISSING_EMAIL');
        }
        try {
            await this.authRepository.resetPassword(email);
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError('No se pudo enviar el correo de recuperación', 'AUTH_RESET_FAILED');
        }
    }
}