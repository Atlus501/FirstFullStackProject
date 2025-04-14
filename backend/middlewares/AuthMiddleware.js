//middleware for authenticaing user

const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken){
        return res.json({error: "Invalid user data!"});
    }

    try{
        const validToken = verify(accessToken, "importantSecret");
    
        if(validToken)
            return next();
        
    }catch(err){
        return res.json({error: err});
    }
}

module.exports = {validateToken}