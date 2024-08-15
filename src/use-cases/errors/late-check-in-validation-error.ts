export class LateCheckInValidationrror extends Error {
  statusCode: number;

  constructor() {
    super(
      "The check-in can only be validated until 20 minutes of its creation.",
    );
    this.statusCode = 409;
  }
}
