'use strict'

const Route = require('./Route')
const Segment = require('./Segment/Segment')
const SegmentVariable = require('./Segment/SegmentVariable')
const TokenMap = require('./Token/TokenMap')
const TokenSingle = require('./Token/TokenSingle')

/**
 * @author Alexander Hållenius
 * 
 * Used to parse a user-defined route into segments.
 */
module.exports = class RouteParser
{
	/**
	 * @param {string} path - The path for the route.
	 * @param {function} callback - The success callback for the route.
	 */
	static parse (path, callback)
	{
		// Split on whitespace
		let pieces = path.split(/\s+/g)
		let isMap = false
		let mapName
		let mapData = []
		let tokens = []
		
		for (let piece of pieces)
		{
			if (isMap)
			{
				if (piece[piece.length - 1] === '}')
				{
					// End of set
					
					isMap = false
					mapData.push(this.makeSegment(
							piece.substring(0, piece.length - 1)))
					
					// Add as token, then clear set data
					tokens.push(new TokenMap(mapName, ...mapData))
					
					mapName = undefined
					mapData = []
				}
				else
				{
					mapData.push(this.makeSegment(piece))
				}
			}
			else if (piece[0] === '{')
			{
				// Start of set
				
				if (piece[piece.length - 1] === '}')
				{
					// Closes itself
					
					tokens.push(new TokenMap(this.makeSegment(
							piece.substring(1, piece.length - 1))))
				}
				else
				{
					isMap = true
					mapName = this.makeSegment(piece.substring(1))
				}
			}
			else
				tokens.push(new TokenSingle(
						this.makeSegment(piece)))
		}
		
		return new Route(tokens, callback)
	}
	
	static makeSegment (piece)
	{
		if (piece[0] === '[' && piece[piece.length - 1] === ']')
			// Is enclosed in '[]'
			
			return new SegmentVariable(piece.substring(1, piece.length - 1))
		else
			return new Segment(piece)
	}
}
