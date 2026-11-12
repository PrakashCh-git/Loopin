import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

async function validateUser(req, res, next) {
    try {
        console.log("Cookies received:", Object.keys(req.cookies || {}));
        // 1. Get token from cookie
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 3. Find the current user in database
        const user = await userModel.findById(decoded.id)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }

        // 4. Attach user to request
        req.user = user;

        // 5. Continue to controller
        next();

    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        console.error("Authentication error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export default validateUser;