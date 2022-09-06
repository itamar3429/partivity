import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class Authenticate implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authenticated = request.isAuthenticated();

    return authenticated;
  }
}

@Injectable()
export class AuthenticateAdmin implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authenticated = request.isAuthenticated();

    return authenticated && request.user.role == 'admin';
  }
}

@Injectable()
export class AuthenticateProvider implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authenticated = request.isAuthenticated();

    return authenticated && ['provider', 'admin'].includes(request.user.role);
  }
}
