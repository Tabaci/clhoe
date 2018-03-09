'use strict'

const TerminalParser = require('./Terminal/TerminalParser')
const RouteHandler = require('./Route/RouteHandler')
const RouteParser = require('./Route/RouteParser')

/**
 * @author Alexander Hållenius
 * 
 * The 'clhoe' interface provided to the user.
 */
module.exports = function ()
{
	let terminalHandler = TerminalParser.parse()
	let routeHandler = new RouteHandler()
	
	/**
	 * Used to populate with user-defined routes.
	 * 
	 * @param {string} path - The user-supplied route path.
	 */
	let commandPopulatingFunction = function (path, callback)
	{
		// Parse and add to route handler
		routeHandler.addRoute(
				RouteParser.parse(path, callback))
	}
	
	/**
	 * Matches all routes with 'terminalHandler'
	 */
	let match = function ()
	{
		return routeHandler.match(terminalHandler)
	}
	
	/**
	 * Function used by programmer to define routes.
	 * 
	 * @callback callback
	 * @param {function} commandPopulatingFunction - Function used to create new 
	 *        routes.
	 * 
	 * @param {callback} callback - The callback supplied.
	 */
	let route = function (callback)
	{
		callback(commandPopulatingFunction)
		
		// TODO: execute matching of the routes
		let matchState = match()
		
		return {
			/**
			 * If no match was found, supply a default.
			 */
			else: function (callback)
			{
				if (matchState === false)
					callback()
			}
		}
	}
	
	return {
		route: route
	}
}()
