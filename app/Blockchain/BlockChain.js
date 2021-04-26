"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var sha256_1 = __importDefault(require("sha256"));
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        var _this = this;
        this.chain = [];
        this.pendingTransactions = [];
        this.nodeAddress = crypto_1.default
            .randomBytes(Math.random() * Math.random())
            .toString('hex');
        this.createNewBlock = function (nonce, previousBlockHash, hash) {
            var newBlock = {
                index: _this.chain.length + 1,
                timestamp: Date.now(),
                transactions: _this.pendingTransactions,
                nonce: nonce,
                hash: hash,
                previousBlockHash: previousBlockHash,
            };
            _this.pendingTransactions = [];
            _this.chain.push(newBlock);
            return newBlock;
        };
        this.createNewTransaction = function (amount, sender, recipient) {
            var newTransaction = {
                amount: amount,
                sender: sender,
                recipient: recipient,
            };
            _this.pendingTransactions.push(newTransaction);
            return _this.getLastBlock()['index'] + 1;
        };
        this.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
            var dataAsString = "" + previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
            var hash = sha256_1.default(dataAsString);
            return hash;
        };
        this.getLastBlock = function () { return _this.chain[_this.chain.length - 1]; };
        this.getPendingTransactions = function () { return _this.pendingTransactions; };
        this.proofOfWork = function (previousBlockHash, currentBlockData) {
            var nonce = 0;
            var hash = _this.hashBlock(previousBlockHash, currentBlockData, nonce);
            while (hash.substring(0, 4) !== '0000') {
                nonce++;
                hash = _this.hashBlock(previousBlockHash, currentBlockData, nonce);
            }
            return nonce;
        };
        this.createNewBlock(Math.random() * Math.random() * Math.random(), crypto_1.default.randomBytes(Math.random() * Math.random()).toString('hex'), crypto_1.default.randomBytes(Math.random() * Math.random()).toString('hex'));
    }
    return BlockChain;
}());
exports.default = BlockChain;
