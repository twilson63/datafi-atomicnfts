import Arweave from 'arweave'
import fs from 'fs'

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
})
const jwk = JSON.parse(fs.readFileSync('mywallet.json', 'utf-8'))
const addr = await arweave.wallets.jwkToAddress(jwk)
const src = fs.readFileSync('contract.js', 'utf-8')
const winston = fs.readFileSync('winston.svg', 'utf-8')
// create contract Src
const cSrc = await arweave.createTransaction({ data: src })
cSrc.addTag('Content-Type', 'application/javascript')
cSrc.addTag('App-Name', 'SmartWeaveContractSource')
cSrc.addTag('App-Version', '0.3.0')
await arweave.transactions.sign(cSrc, jwk)
await arweave.transactions.post(cSrc)

// create contract
const contract = await arweave.createTransaction({ data: winston })
contract.addTag('Content-Type', 'image/svg+xml')
contract.addTag('Network', 'Koii')
contract.addTag('Action', 'marketplace/Create')
contract.addTag('App-Name', 'SmartWeaveContract')
contract.addTag('App-Version', '0.3.1')
contract.addTag('Contract-Src', cSrc.id)
contract.addTag('Init-State', JSON.stringify({
  owner: addr,
  title: 'Winston',
  name: 'Koii',
  description: 'Winston the mascot of Arweave who never forgets!',
  ticker: 'KOINFT',
  balances: {
    [addr]: 1
  },
  locked: [],
  contentType: 'text/svg+xml',
  createdAt: Date.now(),
  tags: [
    // TODO: Add NFT Attributes
  ],
  isPrivate: false
}))

await arweave.transactions.sign(contract, jwk)
await arweave.transactions.post(contract)
console.log('ContractId: ', contract.id)
console.log('Contract Deployed!')