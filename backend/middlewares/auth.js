import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers["authorization"];

    if (!auth ) {
        return res.status(403).json({ message: "JWT is required" });
    }

    try {
        const decoded = jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized, JWT token wrong or expired" });
    }
};
