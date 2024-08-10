export class ResourseNotFoundError extends Error {
  constructor() {
    super('resourse not found.');
  }
}