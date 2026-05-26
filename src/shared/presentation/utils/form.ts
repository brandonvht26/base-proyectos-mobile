export function getErrorMessage(errors: any[]): string | undefined {
    if (!errors || errors.length === 0) return undefined;
    
    const err = errors[0];
    
    if (typeof err === 'string') {
        return err;
    }
    
    // Si es un arreglo de Standard Schema Issues (Zod 3.25+ en TanStack Form)
    if (Array.isArray(err)) {
        return getErrorMessage(err);
    }
    
    // Si es un objeto issue (Standard Schema / ZodIssue)
    if (err && typeof err === 'object') {
        if ('message' in err && typeof err.message === 'string') {
            return err.message;
        }
    }
    
    return err?.toString();
}
