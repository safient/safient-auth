const mongoose = require('mongoose')
const User = mongoose.model('users')

/**
 * Store wallet in database
 * @param wallet
 * @param email
 * @returns {Promise<boolean>}
 */
const saveWallet = async (wallet, email) => {
    try {
        const result = await User.findOneAndUpdate({userEmail: email}, {wallet: wallet})
        console.log("Result:", result)
        return true
    } catch (e) {
        throw e
    }
}

/**
 * Get wallet from database
 * @param email
 * @returns {Promise<null|WalletBase|string|{type: StringConstructor}>}
 */
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

/**
 * Save new user in database
 * @param email
 * @param pass
 * @returns {Promise<Document<any>>}
 */
const saveUser = async (email, pass) => {
    try {
        return await new User({userEmail: email, userPass: pass}).save()
    } catch (e) {
        throw e
    }
}

/**
 * Get new user from database
 * @param email
 * @returns {Promise<any>}
 */
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