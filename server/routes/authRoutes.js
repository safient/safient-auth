const mongoose = require('mongoose')
const User = mongoose.model('users')

module.exports = (app) =>{

    app.post('/api/register', async (req, res)=>{
        try {
            const {email, pass} = req.body
            const result = await new User({userEmail: email, userPass: pass}).save()
            console.log("Result:", result)
            res.send({status:true})
        }catch (e){
            console.log("Error:",e)
            res.send({status: false})
        }
    })

    app.post('/api/login', async (req, res)=>{
        try {
            const {email, pass} = req.body
            const result = await User.findOne({userEmail:email})
            console.log("Result:",result)
            if (result!==null){
                if (result.userPass === pass) {
                    res.send({status: true})
                }
                else {
                    res.send({status: false})
                }
            }else {
                res.send({status:false})
            }
        }catch (e){
            console.log("Error:",e)
            res.send({status: false})
        }
    })
}