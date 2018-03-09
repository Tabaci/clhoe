# clhoe

This is an *npm* module that provides simple, yet elegant, routing for command 
line interfaces, in a similar fashion to mainstream HTTP routing.

## Installation

```
$ npm install clhoe
```

## Usage

In order to do antyhing with *Clhoe*, we first need to include her. Yes, the 
name is one heck of a pun on the actual name.

```javascript
	const Clhoe = require('clhoe')
```

### Basic Routing

Routing is done by calling the `route` function on `Clhoe`. The defined routes 
will be executed automatically once all routes have been added.

```javascript
	Clhoe.route((command) => {
		// TODO: add routes
	})
```

Inside the closure passed to `route`, we get the opportunity to define command 
routes. The `command` parameter passed to the closure we provided, is a function 
that when called, creates a new route: it takes the form 
`command(path, callback)`, whereas the callback will be executed if the path 
matches with what is entered into the terminal.

### Command Route Syntax

As a simple example, one might write:

```javascript
	command('new project', () => {
		console.log('Creating a new project...')
	})
```

The callback will be called, if an only if, the passed arguments from the 
terminal are in the following order:

```
$ mycommand new project
Creating a new project...
```

Otherwise, nothing will be matched. Adding default behavior, we will discuss 
once all the syntax is covered.

#### Variable Captures

The above example is quite dull on its own. At the very least, it would be nice 
if the user could specify the name they want for their project:

```javascript
	command('new [project]', ({ project }) => {
		console.log('Creating a new project ' + project + '...')
	})
```

The `[]` enclosed area captures whatever is typed in by the user and stores that 
in a variable, which we are able to extract from an object passed along to the 
callback provided to the command.

If the following is executed:

```
$ mycommand new monkeys
Creating a new project monkeys...
```

You can see we also specified a name for that project.

#### Optional Groups

Let us elaborate upon what we have and take it even further. For instance, let 
us say we wanted to have a means of specifying the type of the project, but we 
want it to be optional.

This can be accomplished by introducing an optional group, for which we can use 
the `{}` syntax:

```javascript
	command('new [project] {--type [type]}', ({ project, type }) => {
		type = type || 'default'
		
		if (!['default', 'amazing'].includes(type))
			throw new Error('Invalid type!')
		
		console.log('Creating a new ' + type + ' project ' + project + '...')
	})
```

The `type` property on the variables object will be `undefined` if the user 
did not enter it, as such we are making sure it is given a default value.

```
$ mycommand new monkeys --type amazing
Creating a new amazing project monkeys...
```

#### Flags

Using what we know, let us implement an optional flag `-v` for the same program 
that will print additional information regarding the process of setting our 
project up.

```javascript
	command('new [project] {--type [type]} {-v}', ({ project, type }, groups) => {
		type = type || 'default'
		
		if (!['default', 'amazing'].includes(type))
			throw new Error('Invalid type!')
		
		console.log('Creating a new ' + type + ' project ' + project + '...')
		
		if (groups.includes('-v'))
		{
			// TODO: implement verbose mode
		}
	})
```

We can check if an optional group was used by seeing if its name is available in 
the `groups` array added to the callback. If `-v` is included, we wish to 
create our example application in verbose mode. 

### Default Command

If no route was matched, a default callback (if provided) will be called:

```javascript
	Clhoe.route((command) => {
		// ...
	}).else(() => {
		console.log('No command was matched!')
	})
```

The chained `else` function will add such a callback.

#### Help Command

Let us have a look at how a help command might be implemented:

```javascript
	let help = () => {
		console.log('Help command!')
	}
	
	Clhoe.route((command) => {
		// Full match: 'help'
		command('help', help)
		
		// ...
	}).else(help)
```

Thus, either if `$ mycommand help` is successfully matched, or no match at all 
occurred, the `help` closure will be called:

```
$ mycommand help
Help command!

$ mycommand i will not match a route
Help command!
```

## License

This module, and the code therein, is licensed under ISC.
