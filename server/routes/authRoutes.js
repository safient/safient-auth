const jwt = require('jsonwebtoken');
const key = require('../config/keys');
const {getUser, saveUser} = require('../db/mongo')

module.exports = (app) =>{

    app.post('/api/register', async (req, res)=>{
        try {
            const {email, pass} = req.body
            const result = await saveUser(email, pass)
            res.send({
                status: true,
                msg:"User registered!!"
            })
        }catch (e){
            console.log("Error:",e)
            res.send({
                status: false,
                msg:"server error!!"
            })
        }
    })

    app.post('/api/login', async (req, res)=>{
        try {
            const {email, pass} = req.body
            const result = await getUser(email)
            if (result!==null){
                console.log("result:",result)
                if (result.userPass === pass) {
                    const token = jwt.sign({ id: result._id }, key.serverSecret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.send({
                        status: true,
                        msg:"Login Successful!!",
                        token: token
                    })
                }
                else {
                    res.send({
                        status: false,
                        msg:"Wrong password!!"
                    })
                }
            }else {
                res.send({
                    status:false,
                    msg:"No user found!!"
                })
            }
        }catch (e){
            console.log("Error:",e)
            res.send({
                status: false,
                msg:"server error!!"
            })
        }
    })
}