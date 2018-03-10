'use strict'

const Token = require('./Token')
const SegmentVariable = require('./../Route/Segment/SegmentVariable')

/**
 * @author Alexander Hållenius
 * 
 * Handles (holds on to) parsed arguments, parsed by the TerminalParser.
 */
module.exports = class TerminalHandler
{
	constructor ()
	{
		/**
		 * @type {Token[]}
		 */
		this._tokens = []
	}
	
	/**
	 * @param {Token} token - The token to be added.
	 */
	addToken (token)
	{
		this._tokens.push(token)
	}
	
	/**
	 * @param {string} text - The text to create the token with.
	 */
	addTokenBy (text)
	{
		this.addToken(new Token(text))
	}
	
	/**
	 * Creates a copy of this instance.
	 */
	copy ()
	{
		let terminalHandler = new TerminalHandler()
		
		terminalHandler._tokens = this._tokens.slice()
		
		return terminalHandler
	}
	
	/**
	 * @return {Token[]}
	 */
	matchRoute (route)
	{
		let singles = route.singles
		let maps = route.maps
		
		let groups = []
		let variables = {}
		
		if (!this._matchMaps(maps, variables, groups))
			return false
		
		if (!this._matchSingles(singles, variables))
			return false
		
		// Execute matched route
		route.execute(variables, groups)
		
		return true
	}
	
	/**
	 * Matches all supplied maps.
	 * 
	 * @param {TokenMap[]} maps - The maps to perform match with.
	 * @param {Object.<string, string>} variables - The variables to populate.
	 */
	_matchMaps (maps, variables, groups)
	{
		// Match maps first
		for (let map of maps)
		{
			let key = map.key
			let values = map.values
			let removeFrom
			let removeN
			
			// Match with 'this._tokens'
			outer: for (let i = 0; i < this._tokens.length; i ++)
			{
				let token = this._tokens[i]
				
				if (token.text === key.text)
				{
					// We found a match, now match values
					groups.push(key.text) // TODO: only add if full match
					
					removeFrom = i
					
					let tokenI = i + 1
					
					for (let value of values)
					{
						let token = this._tokens[tokenI]
						
						if (value instanceof SegmentVariable)
						{
							// TODO: this should only be added if group fully 
							//       matches. Keep temporary object, then dump 
							//       into actual.
							variables[value.text] = token.text
						}
						else if (value.text !== token.text)
							continue outer
					}
					
					removeN = values.length + 1
					
					break
				}
			}
			
			// Remove consumed data
			this._tokens.splice(removeFrom, removeN)
		}
		
		return true
	}
	
	/**
	 * Performs a match on all supplied singles.
	 * 
	 * @param {TokenSingle[]} singles - The singles to perform match with.
	 * @param {Object.<string, string>} variables - The variables to populate.
	 */
	_matchSingles (singles, variables)
	{
		let single
		
		while ((single = singles.shift()) !== undefined)
		{
			let singleSegment = single.segment
			let token = this._tokens.shift()
			
			if (token === undefined && !(singleSegment instanceof SegmentVariable && singleSegment.isVarargs))
				// We are out of tokens to match, but we still have segments!
				
				return false
			
			if (singleSegment instanceof SegmentVariable)
			{
				if (singleSegment.isVarargs)
				{
					// Extract the rest into the varargs
					
					// The first token is already shifted off, add that first
					variables[singleSegment.text] = (token !== undefined) ?
							[ token.text ] : 
							[]
					
					// Now add the rest of the tokens
					for (let curToken of this._tokens)
						variables[singleSegment.text].push(curToken.text)
					
					this._tokens = []
				}
				else
					variables[singleSegment.text] = token.text
			}
			else if (singleSegment.text !== token.text)
				return false
		}
		
		return this._tokens.length === 0
	}
}
