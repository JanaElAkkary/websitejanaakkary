const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: 'Please authenticate' });
    }
};

module.exports = auth;
