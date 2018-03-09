'use strict'

const TokenSingle = require('./Token/TokenSingle')
const TokenMap = require('./Token/TokenMap')

/**
 * @author Alexander Hållenius
 * 
 * A user-defined route.
 */
module.exports = class Route
{
	/**
	 * @param {Token[]} tokens - The tokens that make up this route.
	 * @param {function} callback - Success callback.
	 */
	constructor (
			tokens, 
			callback)
	{
		/**
		 * @type {TokenMap[]}
		 */
		this._maps = []
		
		/**
		 * @type {TokenSingle[]}
		 */
		this._singles = []
		
		/**
		 * @type {function}
		 */
		this._callback = callback
		
		this._sort(tokens)
	}
	
	/**
	 * Sorts tokens into maps and singles.
	 */
	_sort (tokens)
	{
		for (let token of tokens)
			if (token instanceof TokenSingle)
				this._singles.push(token)
			else if (token instanceof TokenMap)
				this._maps.push(token)
	}
	
	/**
	 * Executes this route with some variables.
	 * 
	 * @param {Object.<string, string>} variables - The variables to execute 
	 *        this route with.
	 */
	execute (variables, groups)
	{
		this._callback(variables, groups)
	}
	
	/**
	 * @return {TokenMap[]}
	 */
	get maps ()
	{
		return this._maps
	}
	
	/**
	 * @return {TokenSingle[]}
	 */
	get singles ()
	{
		return this._singles
	}
}
