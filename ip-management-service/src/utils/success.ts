export class SuccessResult<T> {
  message: string;
  code: number;
  data: T;

  constructor(message: string, code: number, data: T) {
    this.message = message;
    this.data = data;
    this.code = code;
  }
}

export class Created<T> extends SuccessResult<T> {
  constructor(data: T, message = "Successfuly Created!") {
    super(message, 201, data);
  }
}

export class Successful<T> extends SuccessResult<T> {
  constructor(data: T, message = "Success") {
    super(message, 200, data);
  }
}
