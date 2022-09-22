const jwt =require('jsonwebtoken');
function auth(req,res,next){
    const token=req.header('x-auth-token')
    
    if(!token) res.status(401).send('Access Denied')
    try {
        const decoded=jwt.verify(token,'MySecretKey')
        req.user=decoded;
        next();
    } catch (error) {
        res.status(400).send('invalid token')
    }
}
module.exports=auth;