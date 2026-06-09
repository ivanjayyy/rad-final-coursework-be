import { NextFunction, Response } from "express";
import { UserRole } from "../models/userModel";
import { AuthRequest } from "./auth";

// Middleware to check if the user has the required role
export const requireRole = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the user has the required role
    const hasRole = roles.some((role) => req.user.roles?.includes(role));
    
    if (!hasRole) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
