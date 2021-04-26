import BlockChain from '../Blockchain/BlockChain'
import express from 'express'

const router = express.Router()

export default (blockchain: BlockChain) => {
  router.post('/', (req, res) => {
    const blockIndex = blockchain.createNewTransaction(
      req.body.amount,
      req.body.sender,
      req.body.recipient
    )
    res.status(200).json({
      note: `Transaction will be added in block ${blockIndex}`,
    })
    // res.status(200).json({
    //   succes: true,
    // })
  })
  return router
}
