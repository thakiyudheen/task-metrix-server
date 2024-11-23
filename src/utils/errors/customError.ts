
export class CustomError extends Error {
    public status: number;
  
    constructor(message: string, status: number) {
      super(message);
      this.name = this.constructor.name; 
      this.status = status;
      Error.captureStackTrace(this, this.constructor); 
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message: string = "Resource not found", status: number = 404) {
      super(message, status);
    }
  }
  
  export class ValidationError extends CustomError {
    constructor(message: string = "Validation failed", status: number = 400) {
      super(message, status);
    }
  }
  
  export class UnauthorizedError extends CustomError {
    constructor(message: string = "Unauthorized access", status: number = 401) {
      super(message, status);
    }
  }
  