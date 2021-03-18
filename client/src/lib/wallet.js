const wallet = require('wallet-besu')
const {keystore} = require('eth-light')

/**
 * Function to create wallet
 * @param password
 * @returns {Promise<boolean|*>}
 */
export const createWallet = async (password)=>{
    return await wallet.create(password,"orion key1")
}

export const getAllAccounts = async (password)=>{
    return await wallet.login(password)
}

/**
 * Retrieve wallet from localstorage
 * @returns {Promise<*>}
 */
export const retrieveWallet = async ()=>{
    try{
        const serialized_keystore = localStorage.getItem("ethWallet");
        const ethWallet = keystore.deserialize(serialized_keystore)
        console.log("EthWallet: ",ethWallet)
        return ethWallet
    }catch (e){
        console.log("Error:",e)
    }

}