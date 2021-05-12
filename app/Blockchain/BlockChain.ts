import Block from './models/Block'
import Transaction from './models/Transaction'
import crypto from 'crypto'
import sha256 from 'sha256'
import ip from 'ip'


export default class BlockChain {
    private chain: Block[] = []
    private pendingTransactions: Transaction[] = []
    private currentNodeUrl: string = `${ip.address()}:${process.argv[2]}`
    private networkNodes: string[] = []
    constructor() {
        // Create Genesis Block
        this.createNewBlock(
            Math.random() * Math.random() * Math.random(),
            sha256('The New York Times 5/11/2021 After Raid on Aqsa Mosque, Rockets From Gaza and Israeli Airstrikes. F.D.A. Authorizes Pfizer-BioNTech Vaccine for Children 12 to 15'),
            crypto.randomBytes(Math.random() * Math.random()).toString('hex')
        )
        console.log(`Welcome, ${this.currentNodeUrl}, to the Crypto Blockchain`)
    }

    createNewBlock = (nonce: number, previousBlockHash: string, hash: string) => {
        const newBlock: Block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce,
            hash,
            previousBlockHash,
        }
        this.pendingTransactions = []
        this.chain.push(newBlock)
        return newBlock
    }

    createNewTransaction = (
        amount: number,
        sender: string,
        recipient: string
    ) => {
        const newTransaction: Transaction = {
            amount,
            sender,
            recipient,
        }
        this.pendingTransactions.push(newTransaction)
        return this.getLastBlock()['index'] + 1
    }

    hashBlock = (
        previousBlockHash: string,
        currentBlockData: Object,
        nonce: number
    ) => {
        const dataAsString = `${previousBlockHash}${nonce.toString()}${JSON.stringify(
            currentBlockData
        )}`
        const hash = sha256(dataAsString)
        return hash
    }

    // Setters
    addToNetwork = (address: string) => (this.networkNodes.push(address))

    // Getters

    getLastBlock = () => this.chain[this.chain.length - 1]

    getPendingTransactions = () => this.pendingTransactions

    getNodeAddress = () => this.currentNodeUrl

    getNetworkNodes = () => this.networkNodes

    proofOfWork = (previousBlockHash: string, currentBlockData: Object) => {
        let nonce = 0
        let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
        while (hash.substring(0, 4) !== '0000') {
            nonce++
            hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
        }
        return nonce
    }
}
