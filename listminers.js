const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

let blockNum = 0

let run = async () => {
  let addresses = {}
  let miners = {}

  while (true) {
    let blck = blockNum++
    let block = await web3.eth.getBlock(blck)
    if (!block)
      break

    miners[block.miner] = true

    if ((blockNum % 100 - 1) == 0)
      console.log('block', blck,)

  }

  let positiveAddresses = []
  for (miner in miners) {
    try {
      let balance = await web3.eth.getBalance(miner)
      if (balance > 0) {
        positiveAddresses.push(miner)
      }
    } catch (err) {
      console.log(err)
    }
  }
  console.log(positiveAddresses)
}

run()