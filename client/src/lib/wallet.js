const wallet = require('wallet-besu')
const {keystore} = require('eth-light')

export const createWallet = async (password)=>{
    return await wallet.create(password,"orion key1")
}

export const getAllAccounts = async (password)=>{
    return await wallet.login(password)
}

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