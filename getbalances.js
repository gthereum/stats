const Web3 = require('web3')
const fs = require('fs')
const dateFormat = require('dateformat')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

let accountsFile = 'data/accounts.txt'
let balancesFile = 'data/balances.txt'

let accounts = {}
let balances = {}

let write = async () => {
  fs.writeFileSync(balancesFile,JSON.stringify(balances))
  console.log(balancesFile)
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
      const balance = await web3.eth.getBalance(account)
      if (balance > 0) {
        const timestamp = timeConverter(accounts[account])
        balances[account] = [web3.utils.fromWei(balance),timestamp]

      }
    } catch (err) {
      console.log(err)
    }
  }

  write()
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  return dateFormat(a,"yyyy-mm-dd hh:MM:ss")
}

function timeConverter_old(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = year + '-' + (a.getMonth() + 1) + '-' + date + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

run()