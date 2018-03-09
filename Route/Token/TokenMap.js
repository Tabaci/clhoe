'use strict'

const Token = require('./Token')

/**
 * @author Alexander Hållenius
 * 
 * Depicts and identifier that maps to one or more variables.
 */
module.exports = class TokenMap extends Token
{
	/**
	 * @override
	 */
	constructor (key, ...values)
	{
		super(key, ...values)
		
		/**
		 * @param {Segment}
		 */
		this._key = key
		
		/**
		 * @param {Segment[]}
		 */
		this._values = values
	}
	
	/**
	 * @return {Segment}
	 */
	get key ()
	{
		return this._key
	}
	
	/**
	 * @return {Segment[]}
	 */
	get values ()
	{
		return this._values
	}
}
