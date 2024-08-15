export class ResourseNotFoundError extends Error {
  statusCode: number;

  constructor() {
    super("Resourse not found.");
    this.statusCode = 404;
  }
}
