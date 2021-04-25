import sha256 from 'sha256'
import Block from './models/Block'
import Transaction from './models/Transaction'


export default class BlockChain {
    private chain: Block[] = []
    private pendingTransactions: Transaction[] = []
    createNewBlock = (nonce:number, previousBlockHash:string, hash:string) => {
        const newBlock: Block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.pendingTransactions,
            nonce,
            hash,
            previousBlockHash
        } 
        this.pendingTransactions = []
        this.chain.push(newBlock)
        return newBlock
    }

    createNewTransaction = (amount:number, sender:string, recipient:string) => {
        const newTransaction: Transaction = {
            amount,
            sender,
            recipient
        }
        this.pendingTransactions.push(newTransaction)
        return this.getLastBlock()['index'] + 1
    }

    hashBlock = (previousBlockHash:string, currentBlockData:Transaction[], nonce:number) => {
        const dataAsString = `${previousBlockHash}${nonce.toString()}${JSON.stringify(currentBlockData)}`
        const hash = sha256(dataAsString)
        return hash
    }

    getLastBlock = () => this.chain[this.chain.length - 1]

    proofOfWork = (previousBlockHash:string, currentBlockData:Transaction[]) => {
        let nonce = 0
        let lastHash = ''
        while(!lastHash.startsWith('0000')) {
            lastHash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
            nonce++
        }
        console.log('Done')
        return lastHash
    }

}