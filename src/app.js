require("ganache-cli")
//var tcpPortUsed = require('tcp-port-used');
const child_process = require("child_process")

function executeGahacheCLI(action){
	return new Promise((resolve,reject) => {
		//console.log(action.params);
		var command = prepareCommands(action)
		console.log(`Executing: ${command}`)
		child_process.exec(command, (error, stdout, stderr) => {
			if (error) {
			   return reject(`exec error: ${error}`);
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
			}
			return resolve(stdout);
		});
	})
}

function prepareCommands(action){
    let flags = [];
    if (action.params.ACCOUNTS)
		flags.push(`--acounts ${action.params.ACCOUNTS}`)
	if (action.params.DEFAULTBALANCEETHER)
		flags.push(`--defaultBalanceEther ${action.params.DEFAULTBALANCEETHER}`)
	if (action.params.BLOCKTIME)
		flags.push(`--blockTime ${action.params.BLOCKTIME}`)
	if (action.params.DETERMINISTIC)
		flags.push(`deterministic ${action.params.DETERMINISTIC}`)
	if (action.params.SECURE)
		flags.push(`--secure ${action.params.SECURE}`)
	if (action.params.MNEMONIC)
		flags.push(`--mnemonic ${action.params.MNEMONIC}`)
	if (action.params.PORT)
		flags.push(`--port ${action.params.PORT}`)
	if (action.params.HOST)
		flags.push(`--host ${action.params.HOST}`)
	if (action.params.SEED)
		flags.push(`--seed ${action.params.SEED}`)
	if (action.params.GASPRICE)
		flags.push(`--gasPrice ${action.params.GASPRICE}`)
	if (action.params.GASLIMIT)
		flags.push(`gasLimit ${action.params.GASLIMIT}`)
	if (action.params.CALLGASLIMIT)
		flags.push(`--callGasLimit ${action.params.CALLGASLIMIT}`)
	if (action.params.HARDFORK)
		flags.push(`--hardfork ${action.params.HARDFORK}`)
	if (action.params.FORK)
		flags.push(`--fork ${action.params.FORK}`)
	if (action.params.NETWORKID)
		flags.push(`--networkId ${action.params.NETWORKID}`)
	if (action.params.DB)
		flags.push(`--db ${action.params.DB}`)
	if (action.params.DEBUG)
		flags.push(`--debug`)
	if (action.params.MEM)
		flags.push(`--mem ${action.params.MEM}`)
	if (action.params.QUIET)
		flags.push(`--quiet`)
	if (action.params.VERBOSE)
		flags.push(`--verbose`)
	if (action.params.VERSION)
		flags.push(`--version`)
	if (action.params.NOVMERRORSONRPCRESPONSE)
		flags.push(`--noVMErrorsOnRPCResponse`)
	if (action.params.ALLOWUNLIMITEDCONTRACTSIZE)
		flags.push(`--ALLOWUNLIMITEDCONTRACTSIZE`)
	if (action.params.KEEPALIVETIMEOUT)
		flags.push(`--keepAliveTimeout ${action.params.KEEPALIVETIMEOUT}`)
	if (action.params.TIME)		
		flags.push(`--time ${action.params.TIME}`)
	
	return `ganache-cli ${flags.join(' ')} > /dev/null &`
}

function stopGanacheCliExecution(action){
	return new Promise((resolve,reject) => {
		if (!action.params.PORT) {
			action.params.PORT = "8545" // Default Ganache Port.
		}
		var command = `kill $(lsof -t -i:${action.params.PORT})`
		console.log(`Executing: ${command}`)
		child_process.exec(command, (error, stdout, stderr) => {
			if (error) {
			   return reject(`exec error: ${error}`);
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
			}
			//if ()
			return resolve(stdout);
		});
	})
}


module.exports = {
	stopGanacheCliExecution:stopGanacheCliExecution,
	executeGahacheCLI: executeGahacheCLI
}