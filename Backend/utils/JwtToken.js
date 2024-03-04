import jwt from 'jsonwebtoken';

const JWTSignature = process.env.JWT_SIGN;

export function CreateJWT(data) {
    const expTime = '3d';
    const user = {
        email: data.email,
        fullname: data.fullname,
        mobile: data.mobile,
        bloodtype: data.bloodtype,
        state: data.state,
        city: data.city
    }
    const token = jwt.sign({ user }, JWTSignature, { expiresIn: expTime });
    return token;
};


// export function VerifyJWT(req,res,next) {
//     const authHeader = req.headers.cookie;
    
//     if (typeof authHeader !== 'undefined') {
//         const bearer = authHeader.split(" ");
//         const token = bearer[1];
//         try {
//             const userData = jwt.verify(token,JWTSignature);
//             req.data = userData;
//             next();
//         } catch (error) {
//             // console.log("here");
//             res.json({message:"invalid token"});
//         }
//     }
//     else {
//         res.json({message:"invalid token"});
//     }
//     return;
// }

export function VerifyJWT(req, res, next) {
    const authHeader = req.headers.cookie;

    if (typeof authHeader !== 'undefined') {
        const cookies = authHeader.split("; ");
        const accessTokenCookie = cookies.find(cookie => cookie.startsWith('access_token='));
        
        if (accessTokenCookie) {
            const token = accessTokenCookie.split(" ")[1];
            try {
                const userData = jwt.verify(token, JWTSignature);
                req.data = userData;
                next();
            } catch (error) {
                res.json({ message: "invalid token" });
            }
        } else {
            res.json({ message: "token not found" });
        }
    } else {
        res.json({ message: "invalid token" });
    }
    return;
}
