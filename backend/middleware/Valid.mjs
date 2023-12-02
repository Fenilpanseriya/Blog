import jwt from "jsonwebtoken";

export const validToken=async(req,res,next)=>{

        console.log("body contaoin "+req.body.email)
        console.log("token from header is "+req.body.headers.authorization)
        if(req.body.headers.authorization ) {
            try{
               const token =(req.body.headers.authorization)
                let decoded = jwt.verify(token,"fenil1234")
                console.log("decoded is "+JSON.stringify(decoded))
    
                // req.user = await Userinfo.findOne({decoded})
                // console.log("req.user is "+req.user)
            next();
            }catch(error) {
                console.log(error)
                res.status(400)
                throw new Error('Not authorized token')
            }
        }
        else {
            res.status(400)
            throw new Error('Not authorized tokens')
        }
    
    
}