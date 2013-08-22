# BoilerPlus
A fully-featured boilerplate for service-oriented web app front-ends. I couldn't find an easy way to configure proxies for [Yeoman](http://yeoman.io) or [Brunch](http://brunch.io/) projects, which really hampered my ability to develop service-oriented applications… so I cooked this up. By no means is it authoritative or comprehensive, but it includes a lot of the components I usually spend a fair amount of time tweaking and configuring whenever I spin up a new project.

In the spirit of being truly environment agnostic, I've included special instructions for Mac and Windows platforms where applicable.

## Features
### Frameworks, Libraries, Etc. 
* [jQuery](http://jquery.com/), of course. 
* [AngularJS](http://angularjs.org/) - all the cool kids are doing it.
* [Bootstrap](http://getbootstrap.com/2.3.2/) for responsiveness and widgets.
* [Modernizr](http://modernizr.com/) for feature detection.
* [Platform.js](https://github.com/bestiejs/platform.js/) for platform detection.
* [HTML5 Boilerplate](http://html5boilerplate.com/) (jade-ified) because of best practices and stuff.
* [RequireJS](http://requirejs.org/) for AMD goodness.
* [Fontstrap](https://github.com/gregoryloucas/Fontstrap) for classy icons.

### Pre-Processors
* [CoffeeScript](http://coffeescript.org/) because vanilla JavaScript is so 1994.
* [LESS](http://lesscss.org/) because I don't feel like dealing with Ruby dependencies to compile CSS.
* [Jade](http://jade-lang.com/) keeps the HTML nice and tidy.

### Under the Hood
* [Grunt](http://gruntjs.com/) for super-flexible task running.
* [Karma](https://github.com/karma-runner/karma) for unit testing.
* [Bower](https://github.com/bower/bower) and [NPM](https://npmjs.org/) because manually managing dependencies is for suckers.
* [Node.js](http://nodejs.org/) (with [Express](http://expressjs.com/) and [Restler](https://github.com/danwrong/restler)) for development server and proxy functionality.

There are some other things going on behind the scenes; poke around to find out what's doing what.

## Requirements
- [Git](http://git-scm.com/downloads)
- [Node.js](http://nodejs.org/)

## Up and Running

    npm install					# pulls down NPM packages
    npm install -g coffee		# installs CoffeeScript compiler
    npm install -g grunt-cli	# installs Grunt's command-line interface    
	npm install -g karma		# installs Karma
	npm install -g bower		# installs Bower
	bower install				# pulls down Bower packages
	grunt						# default task; performs initial build, copies libraries
	
_If you encounter any issues, try sudo._ 

## Server Configuration
The only things that need to be changed are the route and URL for proxying requests. Of course, feel free to modify or add routes as you see fit.

## Usage
Some common commands:

    node server.js 	# starts the development server
    grunt watch    	# builds project & reloads browser on file save
    grunt test     	# runs unit tests
    grunt copy-libs	# copies files from bower_components to vendor 

## IDE Integration
### Sublime Text 
* [Package Control](https://sublime.wbond.net/installation) _not required but highly recommended_
* [Sublime Grunt](https://github.com/tvooo/sublime-grunt)  
* [LESS Syntax Mode](https://github.com/danro/LESS-sublime)
* [CoffeeScript Syntax Mode](https://github.com/Xavura/CoffeeScript-Sublime-Plugin)
* [Jade Syntax Mode](https://github.com/miksago/jade-tmbundle) _TextMate bundle; requires manual installation_

### Visual Studio
* [GruntLauncher](https://github.com/Bjornej/GruntLauncher) 
* Jade?
* CoffeeScript?

## Structure
	root					// Execute your commands here 'n stuff
		/public				// Web root; compile target for index.jade
			/css			// LESS compilation target
			/fonts			// Fonts live here, if you need them
			/img			// Images live here
			/js				// CoffeeScript compilation target
			/templates		// Jade compilation target for non-index files
			/vendor			// Contains third-party assets
				/js
				/css		
		/source				// Raw source files
			/coffee			// Compiles to ./public/js
			/jade			// Compiles to ./public/
				/templates	// Compiles to ./public/templates
			/less			// Compiles to ./public/css
				/main		// LESS files to compile to their own CSS files
				/partials	// LESS files included by other files
		/tests				// Unit tests live here


