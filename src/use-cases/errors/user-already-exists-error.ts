export class UserAlreadyExistsError extends Error {
  statusCode: number;

  constructor() {
    super("User already exists.");
    this.statusCode = 409;
  }
}
