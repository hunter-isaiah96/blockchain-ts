import Block from './models/Block'
import Transaction from './models/Transaction'
import crypto from 'crypto'
import sha256 from 'sha256'

export default class BlockChain {
  private chain: Block[] = []
  private pendingTransactions: Transaction[] = []
  public nodeAddress = crypto
    .randomBytes(Math.random() * Math.random())
    .toString('hex')
  constructor() {
    this.createNewBlock(
      Math.random() * Math.random() * Math.random(),
      crypto.randomBytes(Math.random() * Math.random()).toString('hex'),
      crypto.randomBytes(Math.random() * Math.random()).toString('hex')
    )
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

  getLastBlock = () => this.chain[this.chain.length - 1]

  getPendingTransactions = () => this.pendingTransactions

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
