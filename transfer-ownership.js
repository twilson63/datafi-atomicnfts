import Arweave from 'arweave'
import { SmartWeaveNodeFactory } from 'redstone-smartweave'
import fs from 'fs'

const jwk = JSON.parse(fs.readFileSync('mywallet.json', 'utf-8'))

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
})

const warp = SmartWeaveNodeFactory.memCached(arweave)
const contract = warp.contract('uToeL4jFavJod3160G5OZXKbmqgcJRvClgC3CZfPwoo')
  .connect(jwk)
const { state } = (await contract.bundleInteraction({ function: 'transfer', target: 'NPenNH32-7ZJ5ygla95Unp8Nh082-NBOc66nRB2Hprs', qty: 1 }))

console.log(state)