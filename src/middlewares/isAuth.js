import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json(
                {message : 'Unauthorized'}
            )
        }

        const token = authHeader.split(' ')[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
        next();
    }catch (error) {
        return res.status(401).json(
            {message : 'Invalid token'}
        )
    }
}

export default isAuth;