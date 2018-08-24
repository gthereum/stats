const fs = require('fs')
const dateFormat = require('dateformat')

let balancesFile = 'data/balances.txt'

let contents = JSON.parse(fs.readFileSync(balancesFile,'utf8'));

let docFile = 'docs/index.html'

let output = ""

let today = new Date();

output += "<title>Gthereum Stats</title>"
output += '<link rel="stylesheet" type="text/css" href="styles.css">'
output += "<h1>Gthereum Stats</h1>\n"
output += "<h2>Last Updated: " + dateFormat(today, "mmmm dS, yyyy") + "</h2>\n"
output += "<table>\n"

output += "<tr><th>Account</th><th>GTH</th><th>Last Mined</th></tr>\n"

let accounts = Object.keys(contents)

accounts.sort(function(a,b) { return contents[b][0] - contents[a][0] })

for (account of accounts) {

	let balance = parseFloat(contents[account][0]).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
	let lastMined = contents[account][1]

	output += "<tr><td>" + account + "</td><td>" + balance + "</td><td>" + lastMined + "</td></tr>\n"

}

output += "</table>\n"

fs.writeFileSync(docFile, output)
console.log("wrote data")