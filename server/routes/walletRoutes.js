const mongoose = require('mongoose')
const User = mongoose.model('users')

module.exports = (app) =>{

    app.post('/api/uploadWallet', async (req, res)=>{
        try {
            const {wallet, email} = req.body
            const result = await User.findOneAndUpdate({userEmail:email}, {wallet:wallet})
            console.log("Result:",result)
            res.send({status:true})
        }catch (e){
            console.log("Error:",e)
            res.send({status: false})
        }
    })

    app.post('/api/getWallet', async (req, res)=>{
        try {
            const {email} = req.body
            const result = await User.findOne({userEmail:email})
            if (result!==null){
                res.send({
                    status: true,
                    wallet:result.wallet
                })
            }else {
                res.send({status:false})
            }
        }catch (e){
            console.log("Error:",e)
            res.send({status: false})
        }
    })
}