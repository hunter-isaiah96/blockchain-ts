import BlockChain from './Blockchain/BlockChain'
import blockchainRoutes from './router/BlockChain.route'
import express from 'express'
import miningRoutes from './router/Mine.route'
import transactionRoutes from './router/Transaction.route'

// import Transaction from './Blockchain/models/Transaction'
// const portNum = process.argv[0]
// console.log(portNum)
const app = express()

const crypto: BlockChain = new BlockChain()

app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.use('/api/blockchain', blockchainRoutes(crypto))
app.use('/api/transaction', transactionRoutes(crypto))
app.use('/api/mine', miningRoutes(crypto))
// app.use('/api/mining', mining)

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`)
// })
