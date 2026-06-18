import type { AppJwtPayload } from "./type.jwt.js";

declare global {
  namespace Express {
    interface Request {
      user?: AppJwtPayload;
    }
  }
}

export {};