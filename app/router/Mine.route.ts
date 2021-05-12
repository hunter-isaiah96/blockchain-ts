import BlockChain from '../Blockchain/BlockChain'
import express from 'express'

const router = express.Router()

export default (blockchain: BlockChain) => {
  router.get('/', (req, res) => {
    const lastBlock = blockchain.getLastBlock()
    const previousBlockHash = lastBlock.hash
    const currentBlockData = {
      transactions: blockchain.getPendingTransactions(),
      index: lastBlock.index + 1,
    }
    const nonce = blockchain.proofOfWork(previousBlockHash, currentBlockData)
    const blockHash = blockchain.hashBlock(
      previousBlockHash,
      currentBlockData,
      nonce
    )

    blockchain.createNewTransaction(12.5, '00', blockchain.getNodeAddress())

    const newBlock = blockchain.createNewBlock(
      nonce,
      previousBlockHash,
      blockHash
    )

    res.status(200).json({
      success: true,
      message: 'Block Successfully Created',
      block: newBlock,
    })
  })
  return router
}
