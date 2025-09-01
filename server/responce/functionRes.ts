export class SuccessResponseinternal<T> {
  public message: string;
  public data?: T;
  public status: number;

  constructor({
    message,
    data,
    status = 200,
  }: {
    message: string;
    data?: T;
    status?: number;
  }) {
    this.message = message;
    this.data = data;
    this.status = status;
  }

  public toJSON() {
    return {
      message: this.message,
      data: this.data,
      status: this.status,
    };
  }
}

function SuccessResponse<T>({
  message,
  data,
  status = 200,
}: {
  message: string;
  data: T;
  status?: number;
}) {
  return {
    message: message || 'Success',
    data,
    status,
  };
}

export { SuccessResponse };
