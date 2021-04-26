"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BlockChain_1 = __importDefault(require("./Blockchain/BlockChain"));
var BlockChain_route_1 = __importDefault(require("./router/BlockChain.route"));
var express_1 = __importDefault(require("express"));
var Mine_route_1 = __importDefault(require("./router/Mine.route"));
var Transaction_route_1 = __importDefault(require("./router/Transaction.route"));
// import Transaction from './Blockchain/models/Transaction'
var port = process.argv;
console.log(port);
var app = express_1.default();
var crypto = new BlockChain_1.default();
app.use(express_1.default.urlencoded({ extended: false, limit: '20mb' }));
app.use('/api/blockchain', BlockChain_route_1.default(crypto));
app.use('/api/transaction', Transaction_route_1.default(crypto));
app.use('/api/mine', Mine_route_1.default(crypto));
// app.use('/api/mining', mining)
app.listen(port, function () {
    console.log("Listening on port " + port);
});
