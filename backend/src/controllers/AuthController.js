import AuthService from "../services/AuthService.js";
import jwtService from "../services/JwtService.js";

const AuthController = {
    async register(req,res) {
        try {
            const userData = req.body;
            const result = await AuthService.register(userData);
            return res.status(201).json({message: "User created successfully", result});
        } catch (err){
            return res.status(500).json({message: err.message});
        }
    },
    async login(req,res) {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(400).json({message: "Email and password are required"});
            }
            const userData = req.body;
            const result = await AuthService.login(userData);
            res.cookie("refresh_token", result.refreshToken, {
                httpOnly: true,
                secure: false, // true if HTTPS
                sameSite: "lax",
                path: "/",
            })
            return res.status(200).json({message: "Login successfully", result: { token: result.accessToken, user: result.user}});
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    async refresh(req,res) {
        try {
            const token = req.cookies.refresh_token;
            if (!token) {
                return res.status(401).json({message: "Unauthorized"});
            }
            const decoded = await jwtService.verifyRefresh(token);
            const access = await jwtService.generateToken(decoded, { expiresIn :"15m"});

            return res.status(200).json({message: "Refresh token successfully", result: { token: access}});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    },
    async logout(req,res) {
        try {
            res.clearCookie("refresh_token", {path: "/"});
            return res.status(204).end();
        } catch (err) {
            return res.status(200).json({message: "Logout failed"});
        }
    }
}

export default AuthController;