import jwtService from "../services/JwtService.js";

const middleware = async (req, res, next) => {
    const auth = req.headers.authorization || "";
    const [,token] = auth.split(" ");
    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        req.user = await jwtService.verifyAccess(token);
        next();
    } catch (err) {
        return res.status(401).json({message: "Unauthorized"});
    }
};

export default middleware;