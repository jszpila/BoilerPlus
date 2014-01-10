# BoilerPlus
A fully-featured boilerplate for service-oriented single-page applications. I couldn't find an easy way to configure proxies for [Yeoman](http://yeoman.io) or [Brunch](http://brunch.io/) projects, which really hampered my ability to develop service-oriented applications… so I cooked this up. By no means is it authoritative or comprehensive, but it includes a lot of the components I usually spend a fair amount of time tweaking and configuring whenever I spin up a new project.

## Features
### Frameworks, Libraries, Etc. 
* [jQuery](http://jquery.com/), of course. 
* [Knockout](http://knockoutjs.com/) for declarative-binding MVVM magic.
* [Backbone.js](http://backbonejs.org/) because I couldn't find a better routing mechanism.
* [Bootstrap](http://getbootstrap.com/2.3.2/) for responsiveness and widgets.
* [Modernizr](http://modernizr.com/) for feature detection.
* [Platform.js](https://github.com/bestiejs/platform.js/) for platform detection.
* [HTML5 Boilerplate](http://html5boilerplate.com/) (jade-ified) because of best practices and stuff.
* [RequireJS](http://requirejs.org/) for AMD goodness.
* [Font Awesome](http://fontawesome.io/) because everyone loves icon fonts.

### Processors
#### Pre-processors
* [CoffeeScript](http://coffeescript.org/) because vanilla JavaScript is so 1994.
* [LESS](http://lesscss.org/) because I don't feel like dealing with Ruby dependencies to compile CSS.
* [Jade](http://jade-lang.com/) keeps the HTML nice and tidy.

#### Post-processors
* [Autoprefixer](https://github.com/ai/autoprefixer) because nuts to remembering vendor prefixes.

### Under the Hood
* [Grunt](http://gruntjs.com/) for super-flexible task running.
* [Bower](https://github.com/bower/bower) and [NPM](https://npmjs.org/) because manually managing dependencies is for suckers.
* [Node.js](http://nodejs.org/) (with [Express](http://expressjs.com/) and [Restler](https://github.com/danwrong/restler)) for development server and proxy functionality.

There are some other things going on behind the scenes; poke around to find out what's doing what.

## Requirements
- [Git](http://git-scm.com/downloads)
- [Node.js](http://nodejs.org/)

## Recommended
- [Chrome](https://www.google.com/intl/en/chrome/browser/)
- [Live Reload Plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
- [Grunt Dev Tools Plugin](https://chrome.google.com/webstore/detail/grunt-devtools/fbiodiodggnlakggeeckkjccjhhjndnb?hl=en)

## Up and Running
The following commands check out the repo to myProject, installs dependencies, performs the initial build, and start the server:

	$ git clone https://github.com/jszpila/BoilerPlus myProject && cd myProject  
	$ sudo npm install -g coffee grunt-cli karma bower grunt-devtools
	$ npm install
	$ bower install	
	$ grunt
	$ node app.js
	
Open up a browser and go to [localhost:2000](http://localhost:2000) and you should see some stuff. Hooray!

__NOTE:__  
If you're developing on Windows, you'll probably need to run the above commands using Git Bash.

## Server Configuration
The only things that need to be changed are the route and URL for proxying requests. Of course, feel free to modify or add routes as you see fit.

## Usage
Some common commands:

    node app.js 	# starts the development server
    grunt watch    	# builds project & reloads browser* on file save
    grunt copy-libs	# copies files from bower_components to vendor 
    grunt clean-dev	# deletes files in app/  
    
<!--
	grunt test		# runs tests (unit & e2e)
	grunt build		# performs release build to dist/
-->

_&#42; assuming Live Reload is properly configured and working._

## Structure      
	BoilerPlus/						// Execute your commands here 'n stuff
	  dist/							// Production-ready files; structure mimics app/
	  app/							// Web root; compile target for index.jade
	    css/						// LESS compilation target
	    fonts/						// Fonts live here, if you need them
	    img/						// Images live here
	    js/							// CoffeeScript compilation target
	    partials/					// Jade compilation target for non-index files
	    vendor/						// Contains third-party assets
		  js/
		  css/		
		  fonts/
	   source/						// Raw source files
	     coffee/					// Compiles to app/js
		   models/					// Models go here
		   viewmodels/				// Here there be view models
	       app.coffee				// Main app logic
		   require-config.coffee	// Require bootstrap config
		   routes.coffee			// App router config
		 img/						// Pretty pictures go here
	      app/						// I don't like having site/app icons at root
	        apple-touch-*-.png		// H5BP placeholder images for iOS devices
	        favicon.ico				// H5BP placeholder favicon
		 jade/						// Compiles to app/
		   partials/				// Compiles to app/partials
		   index.jade				// App's primary markup file
		 meta/						// Info about your app
		 	humans.txt				// ♫ Getting to know all about you… ♫
		 	robots.txt				// You tell them robots
		 less/						// Compiles to app/css
		 	main/					// LESS files that compile to their own CSS files
		 		locale/			    // Locale-specific styles
		 		app.less			// Main stylesheet
		   	partials/			    // LESS files included by other files
		test/						// Tests live here
		  e2e/						// End-to-end tests
		  unit/						// Unit tests
		bower.json					// Bower package info
		Gruntfile.coffee			// Grunt configuration
		package.json				// NPM package info
		app.js					    // Node server app
		
## IDE Integration
### Sublime Text 
* [Package Control](https://sublime.wbond.net/installation) _not required but highly recommended_
* [Sublime Grunt](https://github.com/tvooo/sublime-grunt)  
* [LESS Syntax Mode](https://github.com/danro/LESS-sublime)
* [CoffeeScript Syntax Mode](https://github.com/Xavura/CoffeeScript-Sublime-Plugin)
* [Jade Syntax Mode](https://github.com/miksago/jade-tmbundle) _TextMate bundle; requires manual installation_
