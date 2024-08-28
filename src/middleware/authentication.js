import jwt from 'jsonwebtoken';

class Middleware {
    static async validateToken(req, res, next) {
        const authHeader = req.headers.authorization;
        const hexToken = authHeader && authHeader.split(' ')[1];
        if (hexToken == null) {
            return res.status(400).send({ message: 'Token is missing in header' }); 
        }
        const token = Buffer.from(hexToken, 'hex');
        const originalToken = token.toString('utf8');
        jwt.verify(originalToken, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); 
            res.locals = user; 
            next();
        });
    }
}

export default Middleware;
