import BlockChain from '../Blockchain/BlockChain'
import express from 'express'

const router = express.Router()

export default (blockchain: BlockChain) => {
  router.get('/', (req, res) => {
    res.status(200).json(blockchain)
  })
  return router
}
