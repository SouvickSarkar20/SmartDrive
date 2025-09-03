import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

export const registerUser = async (req, res) => {
 
    
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        res.status(201).json({ msg: "User registered successfully", user: { id: user._id, name, email } });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        
        
        const { email, password } = req.body;
        

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
       

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// ✅ Profile (protected route)
export const getProfile = async (authMiddleware, req, res) => {
    try {
        const user = User.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch (err) {
        res.status(500).send("Server error");
    }
}