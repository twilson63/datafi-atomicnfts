const knode = await import('@_koi/sdk/node.js')

const ktools = new knode.Node()

const walletLocation = 'mywallet.json'

const jwk = await ktools.loadFile(walletLocation)
await ktools.loadWallet(jwk)

let txId = 'zAKO4c7j2VzMJabiImdbqzFyvSz9up1zTa-oPfqca1I'
var result = await ktools.burnKoiAttention(txId)

console.log('transaction', result)