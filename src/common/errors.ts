export interface HttpError extends Error {
  statusCode: number;
}

export class HttpException extends Error implements HttpError {
  statusCode: number;

  constructor(message: string, statusCode: number, name?: string) {
    super(message);
    this.name = name ?? 'HttpException';
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super(message, 400, 'BadRequest');
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'Unauthorized');
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(message, 403, 'Forbidden');
  }
}

export class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(message, 404, 'NotFound');
  }
}

export class ConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super(message, 409, 'Conflict');
  }
}
