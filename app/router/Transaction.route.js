"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.default = (function (blockchain) {
    router.post('/', function (req, res) {
        var blockIndex = blockchain.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
        res.status(200).json({
            note: "Transaction will be added in block " + blockIndex,
        });
        // res.status(200).json({
        //   succes: true,
        // })
    });
    return router;
});
