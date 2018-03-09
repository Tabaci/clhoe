'use strict'

/**
 * @author Alexander Hållenius
 */
module.exports = class Token
{
	/**
	 * @param {...Segment} segments - The segments that make up this token.
	 */
	constructor (...segments)
	{
		/**
		 * @param {Segment[]}
		 */
		this._segments = segments
	}
}
