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
* [Fontstrap](https://github.com/gregoryloucas/Fontstrap) - a classy icon font, built for Bootstrap.

### Pre-Processors
* [CoffeeScript](http://coffeescript.org/) because vanilla JavaScript is so 1994.
* [LESS](http://lesscss.org/) because I don't feel like dealing with Ruby dependencies to compile CSS.
* [Jade](http://jade-lang.com/) keeps the HTML nice and tidy.

### Under the Hood
* [Grunt](http://gruntjs.com/) for super-flexible task running.
* [Karma](https://github.com/karma-runner/karma) for testing all the things.
* [Bower](https://github.com/bower/bower) and [NPM](https://npmjs.org/) because manually managing dependencies is for suckers.
* [Node.js](http://nodejs.org/) (with [Express](http://expressjs.com/) and [Restler](https://github.com/danwrong/restler)) for development server and proxy functionality.

There are some other things going on behind the scenes; poke around to find out what's doing what.

## Requirements
- [Git](http://git-scm.com/downloads)
- [Node.js](http://nodejs.org/)

## Up and Running
The following commands check out the repo to myProject, installs dependencies, performs the initial build, and start the server:

	$ git clone https://github.com/jszpila/BoilerPlus myProject && cd myProject  
	$ sudo npm install -g coffee grunt-cli karma bower
	$ npm install
	$ bower install	
	$ grunt
	$ node server.js
	
Open up a browser and go to localhost:2000 and you should see some stuff. Hooray!

__NOTE:__ if you're on Windows, you may need to use Git Bash.

## Server Configuration
The only things that need to be changed are the route and URL for proxying requests. Of course, feel free to modify or add routes as you see fit.

## Usage
Some common commands:

    node server.js 	# starts the development server
    grunt watch    	# builds project & reloads browser on file save
    grunt test     	# runs tests (unit & e2e)
    grunt copy-libs	# copies files from bower_components to vendor 
    grunt build		# builds files for deployment and copies to dist

## Structure      
	BoilerPlus/				// Execute your commands here 'n stuff
	  config/				// Karma config stuff
	  dist/					// Production-ready files put here by grunt build
	  app/					// Web root; compile target for index.jade
	    css/				// LESS compilation target
	    data/				// Dump for static JSON, XML, etc.
	    fonts/				// Fonts live here, if you need them
	    img/				// Images live here
	    	app/			// I don't like having site/app icons at root
	    js/					// CoffeeScript compilation target
	    partials/			// Jade compilation target for non-index files
	    vendor/				// Contains third-party assets
		  js/
		  css/		
		  fonts/
		 humans.txt			// ♫ Getting to know all about you… ♫
		 robots.txt			// You tell them robots
	   source/				// Raw source files
	     coffee/			// Compiles to ./app/js
	   	   controllers/
	   	   directives/
	   	   filters/
	   	   routes/
	   	   services/
	   	   views/
	       app.coffee		// Main app logic
		   require-config.coffee	// Require bootstrap config
		 jade/				// Compiles to ./app
		   partials/		// Compiles to ./app/partials
		   index.jade
		 less/				// Compiles to ./app/css
		   main/			// LESS files that compile to their own CSS files
		   partials/		// LESS files included by other files
		   app.less
		test/				// Tests live here
		  e2e/				// End-to-end tests
		  unit/				// Unit tests
		bower.json			// Bower package info
		Gruntfile.coffee	// Grunt configuration
		package.json		// NPM package info
		server.js			// Node server app
		
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
