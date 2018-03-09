'use strict'

const Token = require('./Token')

/**
 * @author Alexander Hållenius
 * 
 * As opposed to the map, the single token contains only one segment.
 */
module.exports = class TokenSingle extends Token
{
	/**
	 * @override
	 */
	constructor (segment)
	{
		super(segment)
		
		/**
		 * @type {Segment}
		 */
		this._segment = segment
	}
	
	/**
	 * @return {Segment}
	 */
	get segment ()
	{
		return this._segment
	}
}
