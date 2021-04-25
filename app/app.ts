import express from 'express'
import BlockChain from './Blockchain/BlockChain'
import Transaction from './Blockchain/models/Transaction'

const app = express()

let previousBlockHash = 'amsdoaio21n3o'

const crypto = new BlockChain()

const currentBlockData: Transaction[] = [
  {
    amount: 10,
    sender: '12das',
    recipient: '21d1'
  },
  {
    amount: 15,
    sender: '21d1',
    recipient: '12das'
  },
]
const nonce = 100;
console.log(crypto.hashBlock(previousBlockHash, currentBlockData, nonce))