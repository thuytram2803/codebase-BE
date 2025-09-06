import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const access_token = process.env.ACESS_TOKEN || "dev_access_token";
const refresh_token = process.env.REFRESH_TOKEN || "dev_refresh_token";

const JwtService = {
    async generateToken(payload, options ={ expiresIn:"15m" }) {
        return jwt.sign(payload,access_token,options);
    },
    async generateRefreshToken(payload, options ={ expiresIn : "7d" }) {
        return jwt.sign(payload,refresh_token, { expiresIn : "7d"});
    },
    async verifyAccess(token){
        return jwt.verify(token,access_token);
    },
    async verifyRefresh(token) {
        return jwt.verify(token,refresh_token);
    }
}

export default JwtService;