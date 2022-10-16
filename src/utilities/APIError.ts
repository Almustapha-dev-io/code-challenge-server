export default class APIError extends Error {
  constructor(
    public message: string,
    public code: number,
    public originalError?: Error
  ) {
    super(message);
    this.message = message;
    this.code = code;
    this.originalError = originalError;
  }
}
