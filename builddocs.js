const fs = require('fs')
const dateFormat = require('dateformat')

let balancesFile = 'data/balances.txt'
let aliasesFile = 'private.aliases.csv'

let contents = JSON.parse(fs.readFileSync(balancesFile,'utf8'));

let docFile = 'docs/index.html'
let privateDocFile = 'private/index.html'

let output = ""

let today = new Date();

output += "<title>Gthereum Stats</title>"
output += '<link rel="stylesheet" type="text/css" href="styles.css">'
output += "<h1>Gthereum Stats</h1>\n"
output += "<h2>Last Updated: " + dateFormat(today, "mmmm dS, yyyy") + "</h2>\n"
output += "<table>\n"

output += "<tr><th>Account</th><th>GTH</th><th>Last Mined</th></tr>\n"

let privateOutput = output;

let accounts = Object.keys(contents)

accounts.sort(function(a,b) { return contents[b][0] - contents[a][0] })

let aliases = getAliases();

for (account of accounts) {

	let balance = parseFloat(contents[account][0]).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
	let lastMined = contents[account][1]


	const account_public = aliases[account] ? aliases[account][0] : account
	console.log(aliases)
	output += "<tr><td>" + account_public + "</td><td>" + balance + "</td><td>" + lastMined + "</td></tr>\n"
	
	const account_private = aliases[account] ? aliases[account][1] : account
	privateOutput += "<tr><td>" + account_private + "</td><td>" + balance + "</td><td>" + lastMined + "</td></tr>\n"

}

output += "</table>\n"
privateOutput += "</table>\n"

fs.writeFileSync(docFile, output)
console.log(docFile)
fs.writeFileSync(privateDocFile, privateOutput)
console.log(privateDocFile)

function getAliases() {

	var aliases = {};

	if (fs.existsSync(aliasesFile)) {
		let content = fs.readFileSync(aliasesFile,'utf8')	
		let lines = content.split("\n");

		for (let line of lines) {
			let components = line.split(',')			
			aliases[components[0]] = [components[1],components[2]];
		}

		// let lineReader = require('readline').createInterface({
		// 	input: require('fs').createReadStream(aliasesFile)
		// });
		// lineReader.on('line', function(line) {
		// 	console.log(aliases);
		// });
	}
	return aliases;
}