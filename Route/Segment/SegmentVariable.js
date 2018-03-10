'use strict'

const Segment = require('./Segment')

/**
 * @author Alexander Hållenius
 * 
 * A variable segment is simply a segment that stores the value inputted through 
 * the terminal.
 */
module.exports = class SegmentVariable extends Segment
{
	/**
	 * @param {string} name - The name for this variable segment.
	 * @param {boolean} isVarargs - Whether varargs or not (...).
	 */
	constructor (
			name, 
			isVarargs)
	{
		super (name)
		
		/**
		 * @type {boolean}
		 */
		this._isVarargs = isVarargs
	}
	
	get isVarargs ()
	{
		return this._isVarargs
	}
}
