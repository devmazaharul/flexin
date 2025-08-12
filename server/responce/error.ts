import logger from "../log/setup";

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
        logger.error(`Error type [${appError.name}] - Error message [${appError.message}]`)
    return {
      name:appError.name,
      message:appError.message || 'An error occurred',
      status:appError.status
    }
  } else {
    const othersError = error as {
      message: string;
      status: number;
    };
    logger.error(`Error type [Error] - Error message ${othersError.message}`)
    return `${othersError.message || "An error occurred"}-${othersError.status || 400}`;
  }
};

export default AppError;
