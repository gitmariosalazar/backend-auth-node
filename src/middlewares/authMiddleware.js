// middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: 'No autorizado'});
    }
    console.log('Next==>', req.isAuthenticated());
    next();
};

export default authMiddleware;
