const {getAllAccounts, addAccount, createWallet} = require('../lib/wallet')
const {getWallet, saveWallet} = require('../db/mongo')
const {keystore} = require('eth-light')
const key = require('../config/keys')
const jwt = require('jsonwebtoken');
const Web3 = require('web3');
const web3 = new Web3();

const verifyToken = async (req)=>{
    const token = req.headers['x-access-token'];
    if (!token){
        return false
    }
    try {
        await jwt.verify(token, key.serverSecret);
        return true
    }catch (e){
        return false
    }
}

module.exports = (app) => {

    app.post('/api/create', async (req, res) => {
        try {
            const tokenStatus = await verifyToken(req)
            console.log('Token:',tokenStatus)
            if (!tokenStatus){
                return res.send({
                    status: false,
                    msg: 'token not verified!!'
                })
            }

            let {secret, userEmail, walletPass} = req.body;
            if (secret.length === 0)
                secret = "qwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnmv"

            const wallet = await createWallet(walletPass, secret)

            if (wallet) {
                const account = await addAccount(wallet, walletPass)
                console.log("Wallet::", account)
                const serializedWallet = wallet.serialize()
                const saveStatus = await saveWallet(JSON.stringify(serializedWallet), userEmail)
                console.log("SaveStatus:", saveStatus)
                if (saveStatus)
                    return res.send({status: true})
            }
            return res.send({status: false})
        } catch (e) {
            console.log("Error while creating wallet!!", e)
            return res.send({status: false})
        }
    })

    //just to test if wallet is created on not
    app.post('/api/getWallet', async (req, res) => {
        try {
            const tokenStatus = await verifyToken(req)
            console.log('Token:',tokenStatus)
            if (!tokenStatus){
                return res.send({
                    status: false,
                    msg: 'token not verified!!'
                })
            }

            const {email} = req.body
            const wallet = await getWallet(email)
            if (wallet !== null) {
                const ethWallet = await keystore.deserialize(JSON.parse(wallet))
                return res.send({
                    status: true,
                    wallet: ethWallet
                })
            }
            return res.send({status: false})
        } catch (e) {
            console.log("Error:", e)
            return res.send({status: false})
        }
    })

    app.post('/api/accounts', async (req, res) => {
        try {
            const tokenStatus = await verifyToken(req)
            console.log('Token:',tokenStatus)
            if (!tokenStatus){
                return res.send({
                    status: false,
                    msg: 'token not verified!!'
                })
            }

            const {email, walletPass} = req.body
            const wallet = await getWallet(email)
            if (wallet != null) {
                const ethWallet = keystore.deserialize(JSON.parse(wallet))
                const accounts = await getAllAccounts(walletPass, ethWallet)
                console.log("Address:", accounts)
                return res.send({
                    status: true,
                    accounts: accounts
                })
            }
            return res.send({status: false})
        } catch (e) {
            console.log("Error:", e)
            return res.send({status: false})
        }
    })

    app.post('/api/sign', async (req, res) => {
        try {
            const tokenStatus = await verifyToken(req)
            console.log('Token:',tokenStatus)
            if (!tokenStatus){
                return res.send({
                    status: false,
                    msg: 'token not verified!!'
                })
            }
            const {account,paramsHash} = req.body;
            const user = await web3.eth.accounts.privateKeyToAccount(`0x${account}`);
            if (user!=null){
                const signature = await user.sign(paramsHash)
                return res.send({
                    status: true,
                    signature: signature
                })
            }
            return res.send({status: false})
        } catch (e) {
            console.log("Error:", e)
            return res.send({status: false})
        }
    })
}