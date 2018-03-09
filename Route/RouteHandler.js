'use strict'

/** 
 * @author Alexander Hållenius
 * 
 * Class used to handle and store multiple routes.
 */
module.exports = class RouteHandler
{
	constructor ()
	{
		/**
		 * @type {Route[]}
		 */
		this._routes = []
	}
	
	/** 
	 * @param {Route} route - The route to be added.
	 */
	addRoute (route)
	{
		this._routes.push(route)
	}
	
	match (terminalHandler)
	{
		// Copy terminal handler
		terminalHandler = terminalHandler.copy()
		
		for (let route of this._routes)
			if (terminalHandler.matchRoute(route))
				return true
		
		return false
	}
}
