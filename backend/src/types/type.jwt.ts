import type { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../../generated/prisma/client.js";

export interface AppJwtPayload extends JwtPayload {
  userId: number;
  role: UserRole;
}