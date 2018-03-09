'use strict'

/**
 * @author Alexander Hållenius
 * 
 * Base class for segments.
 */
module.exports = class Segment
{
	/**
	 * @param {string} text - The text that makes up this segment.
	 */
	constructor (text)
	{
		/**
		 * @type {string}
		 */
		this._text = text
	}
	
	/**
	 * @return {string}
	 */
	get text ()
	{
		return this._text
	}
}
