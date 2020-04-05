export class Exception extends Error {
  public code: number;

  constructor(exception: {code: number; message: string}) {
    super(exception.message);
    this.code = exception.code;
  }
}
