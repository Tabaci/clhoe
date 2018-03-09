'use strict'

/**
 * @author Alexander Hållenius
 * 
 * A token as parsed by the TerminalParser.
 */
module.exports = class Token
{
	/**
	 * @param {string} text - The value associated with this token.
	 */
	constructor (text)
	{
		this.text = text
	}
}
