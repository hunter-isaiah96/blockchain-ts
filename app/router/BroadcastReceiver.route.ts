import BlockChain from '../Blockchain/BlockChain'
import express from 'express'
import axios from 'axios'

const router = express.Router()

export default (blockchain: BlockChain) => {

    router.post('/register-broadcast', async (req, res) => {
        const newNodeUrl = req.body.newNodeUrl
        if (blockchain.getNetworkNodes().indexOf(newNodeUrl) == -1) blockchain.addToNetwork(newNodeUrl)
        blockchain.getNetworkNodes().forEach(async networkNodeUrl => {
            try {
                await axios.post(`${newNodeUrl}/api/broadcaster/register`, () => {
                    newNodeUrl
                })
            } catch (err) {
                console.log(err)
            }
        })

        try {
            await axios.post(`${newNodeUrl}/api/broadcaster/register-bulk`, () => {
                allNetworkNodes: [...blockchain.getNetworkNodes(), blockchain.getNodeAddress()]
            })
            res.status(200).json({ message: 'Node successfully Register in the Network' })
        } catch (err) {
            console.log(err)
        }

    })

    router.post('/register', (req, res) => {
        const newNodeUrl = req.body.newNodeUrl

        if (blockchain.getNetworkNodes().indexOf(newNodeUrl) == -1 && blockchain.getNodeAddress != newNodeUrl)
            blockchain.addToNetwork(newNodeUrl)
        res.status(200).json({ message: 'New Node Registere with Node!' })
    })

    router.post('/register-bulk', (req, res) => {

    })

    return router
}
