export class MaxDistanceError extends Error {
  statusCode: number;

  constructor() {
    super("Maximum distance reached.");
    this.statusCode = 400;
  }
}
