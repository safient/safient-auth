const {keystore} = require('eth-light')

const initializeLightWallet = (entropy, password) => {
    try {
        const randomSeed = keystore.generateRandomSeed(entropy)
        const infoString = 'Your new wallet seed is: "' + randomSeed + '". Please save this seed';
        console.log(infoString)
        return new Promise((resolve) => {
            keystore.createVault({
                password: password,
                seedPhrase: randomSeed,
                hdPathString: 'm/0\'/0\'/0\''
            }, (err, ks) => {
               // ethWallet = ks;
                resolve(ks)
            })
        })
    } catch (err) {
        throw err
    }
}

const createWallet = async (password, entropy) => {
    try {
        return await initializeLightWallet(entropy, password)
    } catch (err) {
        throw err
    }
}

const addAccount = (wallet,password) =>{
    try {
        return new Promise((resolve)=> {
            wallet.keyFromPassword(password,(err, pwDerivedKey) =>{
                wallet.generateNewAddress(pwDerivedKey, 1);
                resolve(wallet)
            });
        })
    } catch (err) {
        throw err
    }
}

const restoreSeed = (password, ethWallet) => {
    try {
        return new Promise((resolve)=> {
            ethWallet.keyFromPassword(password,(err, pwDerivedKey)=> {
                const seed = ethWallet.getSeed(pwDerivedKey);
                resolve(seed)
            });
        })
    } catch (err) {
        throw err
    }
}

const restoreWallet = (password, seed) => {
    try {
        return new Promise((resolve) => {
            keystore.createVault({
                password: password,
                seedPhrase: seed,
                hdPathString: 'm/0\'/0\'/0\''
            },(err, ks) => {
                console.log("Wallet restored!")
                resolve(ks)
            });
        })

    } catch (err) {
        throw err``
    }
}


const clearWallet = (password) => {
    try {
        restoreWallet(password)
        console.log("Removed all accounts!")
    } catch (err) {
        throw err
    }
}

const getAllAccounts = (password, ethWallet) => {
    try {
        if (ethWallet == null) {
            return false
        }
        console.log("EthWallet:",ethWallet)
        let accounts = []

        return new Promise((resolve) => {
            ethWallet.keyFromPassword(password, (err, pwDerivedKey) => {
                let ethAccounts = ethWallet.getAddresses();
                ethAccounts.forEach((address) => {
                    const prv_key = ethWallet.exportPrivateKey(address, pwDerivedKey)
                    accounts.push(prv_key)
                })
                resolve(accounts)
            })
        })

    } catch (err) {
        throw err
    }
}

module.exports = {
    createWallet,
    addAccount,
    restoreSeed,
    restoreWallet,
    clearWallet,
    getAllAccounts
}