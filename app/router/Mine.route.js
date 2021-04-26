"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.default = (function (blockchain) {
    router.get('/', function (req, res) {
        var lastBlock = blockchain.getLastBlock();
        var previousBlockHash = lastBlock.hash;
        var currentBlockData = {
            transactions: blockchain.getPendingTransactions(),
            index: lastBlock.index + 1,
        };
        var nonce = blockchain.proofOfWork(previousBlockHash, currentBlockData);
        var blockHash = blockchain.hashBlock(previousBlockHash, currentBlockData, nonce);
        blockchain.createNewTransaction(12.5, '00', blockchain.nodeAddress);
        var newBlock = blockchain.createNewBlock(nonce, previousBlockHash, blockHash);
        res.status(200).json({
            success: true,
            message: 'Block Successfully Created',
            block: newBlock,
        });
    });
    return router;
});
