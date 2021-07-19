import web3 from './web3'

const ADDRESS = '0xe222B7436bf29D6600c466862C39d44bB966a429'

const ABI = 
[
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "manager",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "enter",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "pickWinner",
        "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPlayers",
        "outputs": [
        {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
        }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

const lottery = new web3.eth.Contract(ABI, ADDRESS) 

async function getManager() {
    const manager = await lottery.methods.manager().call()
    return manager
}

async function getPlayers() {
    const players = await lottery.methods.getPlayers().call()
    return players
}

async function pickWinner(address) {
    const res = await lottery.methods.pickWinner().send({
        from: address
    })
    return res
}

async function getBallance() {
    try {
        const ballanceWei = await web3.eth.getBalance(lottery.options.address)
        return web3.utils.fromWei(ballanceWei, "ether")
    } catch (error) {
        console.warn("Fails to get ballance", console.error());
    }
}

async function buyTicket(address, amount) {
    let wei = web3.utils.toWei(amount, 'ether');

    try {
        const res = await lottery.methods.enter()
        .send({
            from: address,
            value: wei
        })
        return res
    } catch(error) {
        console.log("Fails to buy a ticket", error);
        return error;
    }
}

export {getManager, getPlayers, pickWinner, buyTicket, getBallance}