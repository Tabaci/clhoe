'use strict'

const TerminalHandler = require('./TerminalHandler')

/**
 * @author Alexander Hållenius
 * 
 * Performs parsing for terminal arguments.
 */
module.exports = class TerminalParser
{
	/**
	 * Parses the 'argv' as available from the process.
	 */
	static parse ()
	{
		// The handler to populate and return
		let terminalHandler = new TerminalHandler()
		
		let argvs = this.extractArgvs()
		
		for (let argv of argvs)
			terminalHandler.addTokenBy(argv)
		
		return terminalHandler
	}
	
	/**
	 * @return {string[]} The CLI user's arguments.
	 */
	static extractArgvs ()
	{
		// The first two are for 'node' and this application: slice them off
		return process.argv.slice(2)
	}
}
