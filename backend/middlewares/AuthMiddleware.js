//middleware for authenticaing user

const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken){
        return res.status(404).json({error: "Invalid user data!"});
    }

    try{
        const validToken = verify(accessToken, "importantSecret");
    
        if(validToken){
            req.user = validToken;
            return next();
        }

        return res.status(404).json({error: "Invalid user data!"});
        
    }catch(err){
        return res.status(404).json({error: err});
    }
}

module.exports = {validateToken}