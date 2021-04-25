import Transaction from './Transaction'
export default interface Block {
    index: number,
    timestamp: number,
    transactions: Transaction[],
    nonce: number,
    previousBlockHash: string,
    hash: string
}