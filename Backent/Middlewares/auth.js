const auth = async (req, res, next) => {
    
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user; // ✅ Ensure req.user is set
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};