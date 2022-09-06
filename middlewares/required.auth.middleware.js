export const requiredRegisterMiddleware = (req,res,next) => {
    //security
  if (!req.body.username) {
    return res.status(400).json({
       code: 400,
       message: "required username"
     })
   }else if (!req.body.email) {
     return res.status(400).json({
       code: 400,
       message: "required email"
     })
   }else if (!req.body.password) {
     return res.status(400).json({
       code: 400,
       message: "required password"
     })
   }

   next()
}

export const requiredLoginMiddleware = (req,res,next) => {
    //security
  if (!req.body.username) {
    return res.status(400).json({
       code: 400,
       message: "required username"
     })
   }else if (!req.body.password) {
     return res.status(400).json({
       code: 400,
       message: "required password"
     })
   }
   
   next()
}

export const requiredPassword = (req,res,next) => {
  if(!req.body.password ){
    next()
  }else if(req.body.password.length < 8 ){
    return res.status(400).json({
        status: false,
        message: "password length must be 8 words or more"
    })
  }
}
