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
	 */
	constructor (name)
	{
		super (name)
	}
}
