class PeerAlert {
    constructor(indices, cbc) {
        this.indices = indices; //index
        this.cbc = cbc; //current blockchain
    }
    process() {
        for (const v of this.indices) {  //check for double spending attack
            if (v >= 1) {
                console.log("Disconnected block number ", v, "due to a suspected double spending attack.");
            }
        }
        for (const v of this.indices) {  //this part of code disconnects the transactions from the list 
            this.cbc.pendingTransactions.splice(v, 1);
            if (v <= this.cbc.blockchain.length - 1) {
                this.cbc.blockchain[v + 1].precedingHash = null;
                this.cbc.blockchain.splice(v, 1);
            }
            for (var i = 0; i < this.indices.length; i++) {
                this.indices[i] -= 1;
            }
        }
        return this.cbc;
    }
}
module.exports.PeerAlert = PeerAlert;

