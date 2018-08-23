const Web3 = require('web3')
const fs = require('fs')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

let blockNum = 0

let blockNumFile = 'data/blocknum.txt'
let accountsFile = 'data/accounts.txt'

if (fs.existsSync(blockNumFile)) {
  contents = fs.readFileSync(blockNumFile,'UTF-8')
  let readInt = parseInt(contents)
  if (readInt > 0)
    blockNum = readInt
}

let accounts = {}

let write = async () => {
  fs.writeFileSync(blockNumFile,blockNum)
  fs.writeFileSync(accountsFile,Object.keys(accounts).join("\n"))
  console.log("wrote data")
}

let loadAccounts = async () => {
  if (fs.existsSync(accountsFile)) {
    contents = fs.readFileSync(accountsFile,'UTF-8').toString().split("\n")
    for (i in contents)
      accounts[contents[i]] = true
  }
}

let stop = false

let run = async () => {

  loadAccounts()
  
  while (true && !stop) {
    let blck = blockNum++
    let block = await web3.eth.getBlock(blck)
    if (!block)
      break

    accounts[block.miner] = true

    if ((blockNum % 100 - 1) == 0)
      console.log('block', blck,)

  }

  write()
}

process.on('SIGINT', function() {
  stop = true
  write()
  process.exit()
})

run()