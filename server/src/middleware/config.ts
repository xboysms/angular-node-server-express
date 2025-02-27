import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'eyJ1c2VybmFtZSI6InN0ZXZlIiwicGFzc3dvcmQiOiJzdGV2ZSIsImFsZyI6IkhTMjU2In0.eyJ1c2VybmFtZSI6InN0ZXZlIiwicGFzc3dvcmQiOiJzdGV2ZSIsImFsZyI6IkhTMjU2In0.vkYU0IzJN6vRgBXrBHDq0kxSy3gVtxW4_pUlKUdDzWo',
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/defaultdb',
};
