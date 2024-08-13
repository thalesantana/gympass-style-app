export class MaxNumberOfCheckInsError extends Error {
  statusCode: number;
  
  constructor() {
    super('Max number of check-ins reached.');
    this.statusCode = 409;
  }
}