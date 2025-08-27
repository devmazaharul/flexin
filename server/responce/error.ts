
class AppError extends Error {
  public status: number;
  constructor({ message, status = 400 }: { message: string; status?: number }) {
    super(message);
    this.name = 'AppError', 
    this.status = status
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    const appError = error as AppError;
        // logger.error(`Error type [${appError.name}] - Error message [${appError.message}]`)
    return {
      message:appError.message || 'An error occurred',
      status:appError.status
    }
  } else {
    const othersError = error as {
      message: string;
      status: number;
    };
    // logger.error(`Error type [Error] - Error message ${othersError.message}`)
    return {
      message:othersError.message,
      status:othersError.status || 400
    }
  }
};

export const globalErrorMessage = (error: any) =>
  typeof error === 'object' && error !== null && 'message' in error
    ? String((error as { message: unknown }).message)
    : 'Erorr occourd';


export default AppError;
