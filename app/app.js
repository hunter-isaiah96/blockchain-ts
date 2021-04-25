"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var BlockChain_1 = __importDefault(require("./Blockchain/BlockChain"));
var app = express_1.default();
var previousBlockHash = 'amsdoaio21n3o';
var crypto = new BlockChain_1.default();
var currentBlockData = [
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
];
var nonce = 100;
console.log(crypto.hashBlock(previousBlockHash, currentBlockData, nonce));
