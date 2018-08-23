const Web3 = require('web3')
const fs = require('fs')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

let accountsFile = 'data/accounts.txt'
let balancesFile = 'data/balances.txt'

let accounts = {}
let balances = {}

let write = async () => {
  fs.writeFileSync(balancesFile,JSON.stringify(balances))
  console.log("wrote data")
}

let run = async () => {

  if (fs.existsSync(accountsFile)) {
    contents = fs.readFileSync(accountsFile,'UTF-8').toString().split("\n")
    for (line of contents) {
      const split = line.split(',')
      if (split[0])
        accounts[split[0]] = split[1]
    }
  }

  for (account of Object.keys(accounts)) {
    try {
      let balance = await web3.eth.getBalance(account)
      if (balance > 0) {
        balances[account] = [balance,accounts[account]]
      }
    } catch (err) {
      console.log(err)
    }
  }

  write()
}

run()