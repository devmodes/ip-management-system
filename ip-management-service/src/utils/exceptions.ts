export class HttpException extends Error {
  message: string;
  status: number;
  errors: any;

  constructor(message: string, status: number, errors: any) {
    super(message);
    this.message = message;
    this.status = status;
    this.errors = errors;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, errors: any) {
    super(message, 400, errors);
  }
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super("You dont't have permission to perform this action", 401, null);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = "Not Found") {
    super(message, 404, null);
  }
}

export class UnprocessableEntitiesException extends HttpException {
  constructor(message: string, errors: any) {
    super(message, 422, errors);
  }
}

export class InternalServerException extends HttpException {
  constructor(errors: any) {
    super("Internal Server Error", 500, errors);
  }
}
