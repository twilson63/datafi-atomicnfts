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
const contract = warp.contract('zAKO4c7j2VzMJabiImdbqzFyvSz9up1zTa-oPfqca1I')
  .connect(jwk)
const { result } = (await contract.viewState({ function: 'balance' }))

console.log(result)