export class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message:string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

interface CustomResponse {
  statusCode: number;
  message: string;
  data?: {}
}

export const OK = (message: string = "OK", data?: {}): CustomResponse => ({
  statusCode: 200,
  message,
  data
})

export const Created = (message: string = "Created", data?: {}) => ({
  statusCode: 201,
  message,
  data
})

export const Enprocessable = (message: string): CustomResponse => ({
  statusCode: 422,
  message
});

export const Unauthorize = (message: string): CustomResponse => ({
  statusCode: 401,
  message
});
