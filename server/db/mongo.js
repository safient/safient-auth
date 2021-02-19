const mongoose = require('mongoose')
const User = mongoose.model('users')

const saveWallet = async (wallet, email) => {
    try {
        const result = await User.findOneAndUpdate({userEmail: email}, {wallet: wallet})
        console.log("Result:", result)
        return true
    } catch (e) {
        throw e
    }
}

const getWallet = async (email) => {
    try {
        const result = await User.findOne({userEmail: email})
        if (result != null) {
            //console.log("Wallet:",result.wallet)
            return result.wallet
        }
        return null;
    } catch (e) {
        throw e
    }
}

const saveUser = async (email, pass) => {
    try {
        return await new User({userEmail: email, userPass: pass}).save()
    } catch (e) {
        throw e
    }
}

const getUser = async (email) => {
    try {
        return await User.findOne({userEmail: email})
    } catch (e) {
        throw e
    }
}

module.exports = {
    saveWallet,
    getWallet,
    saveUser,
    getUser
}