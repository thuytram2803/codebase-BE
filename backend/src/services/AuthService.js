import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import jwtService from "./JwtService.js";

const AuthService = {
    async register(userData) {
        const exists = await User.findOne({ email: userData.email });
        if (exists) {
            throw new Error("EMAIL_TAKEN");
        }
        const hash = await bcrypt.hash(userData.password, 10);
        const user = await User.create({
            ...userData,
            password: hash,
        });
        return { email: user.email, username: user.username };
    },
    async login(userData) {
        const user = await User.findOne({ email: userData.email });
        if (!user) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const ok = await bcrypt.compare(userData.password, user.password);
        if (!ok) {
            throw new Error("INVALID_CREDENTIALS");
        }
        const accessToken = await jwtService.generateToken({ email: user.email, sub: user._id}, { expiresIn: "1h"});
        const refreshToken = await jwtService.generateRefreshToken({email: user.email, sub: user._id}, { expiresIn: "7d"});
        return { accessToken, refreshToken, user: { email: user.email, username: user.username } };
    },
};

export default AuthService;