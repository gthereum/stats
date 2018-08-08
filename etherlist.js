const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

let blockNum = 0

let run = async () => {
  let addresses = {}

  while (true) {
    let blck = blockNum++
    let block = await web3.eth.getBlock(blck)
    if (!block)
      break

    console.log('block', blck, 'transactions', block.transactions.length)
    for(let i = 0; i < block.transactions.length; i++) {
      let tx = await web3.eth.getTransaction(block.transactions[i])
      if (parseInt(tx.value) > 0) {
        addresses[tx.to] = true
      }
    }
  }

  let positiveAddresses = []
  for (address in addresses) {
    try {
      let balance = await web3.eth.getBalance(address)
      if (balance > 0) {
        positiveAddresses.push(address)
      }
    } catch (err) {
      console.log(err)
    }
  }
  console.log(positiveAddresses)
}

run()