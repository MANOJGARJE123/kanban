import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try{
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({message : 'Unauthorized'})
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode) {
            return res.status(401).json(
                {message : 'Unauthorized'}
            )
        }

        req.user = decode;
        next();
    }catch (error) {
        return res.status(401).json({message : 'Invalid token'})
    }
}

export default isAuth;