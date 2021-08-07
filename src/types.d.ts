
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export interface IGetUserAuthInfoRequest extends Request {
    user?: any;
  }