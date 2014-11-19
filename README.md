#generator-cg-gas

>Yeoman Generator for Enterprise Angular Projects with Gulp and Sass

This generator follows the [Angular Best Practice Guidelines for Project Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub).

Features

* Provides a directory structure geared towards large modularized Angular projects.
    * Each controller, service, filter, and directive are placed in their own file.
    * All files related to a conceptual unit are placed together.  For example, the controller, HTML, SASS, and unit test for a partial are placed together in the same directory.
* Provides a ready-made Gulp build that produces an extremely optimized distribution.
   * `gulp serve` task allows you to run a simple development server with watch/livereload enabled.  Additionally, JSHint and the appropriate unit tests are run for the changed files.
* Integrates Bower for package management
* Includes Yeoman subgenerators for directives, services, partials, filters, and modules.
* Integrates LESS and includes Bootstrap via the source LESS files allowing you to reuse Bootstrap vars/mixins/etc.
* Integrates SASS and includes Bootstrap via the source SASS files allowing you to reuse Bootstrap vars/mixins/etc.
* Easily Testable - Each sub-generator creates a skeleton unit test.  Unit tests can be run via `gulp test:unit` and they run automatically during the gulp watch that is active during `gulp serve`.

Directory Layout
-------------
All subgenerators prompt the user to specify where to save the new files.  Thus you can create any directory structure you desire, including nesting.  The generator will create a handful of files in the root of your project including `index.html`, `app.js`, and `app.scss`.  You determine how the rest of the project will be structured.

In this example, the user has chosen to group the app into an `admin` folder, a `search` folder, and a `service` folder.


    app.scss ........................... main app-wide styles
    app.js ............................. angular module initialization and route setup
    index.html ......................... main HTML file
    gulfile.js ......................... Gulp build file
    /app ............................... Root Application
      /modules ......................... Main folder for modularizerd app
        /admin ......................... example admin module folder
          admin.js ..................... admin module initialization and route setup
          admin.scss ................... admin module SASS
          /admin-directive1 ............ angular directives folder
            admin-directive1.js ........ example simple directive
            admin-directive1-spec.js.... example simple directive unit test
          /admin-directive2 ............ example complex directive (contains external partial)
            admin-directive2.js ........ complex directive javascript
            admin-directive2.html ...... complex directive partial
            admin-directive2.scss ...... complex directive SASS
            admin-directive2-spec.js ... complex directive unit test
          /admin-partial ............... example partial
            admin-partial.html ......... example partial html
            admin-partial.js ........... example partial controller
            admin-partial.scss ......... example partial SASS
            admin-partial-spec.js ...... example partial unit test
        /search ........................ example search component folder
          my-filter.js ................. example filter
          my-filter-spec.js ............ example filter unit test
          /search-partial .............. example partial
            search-partial.html ........ example partial html
            search-partial.js .......... example partial controller
            search-partial.scss ........ example partial SASS
            search-partial-spec.js ..... example partial unit test
        /service ....................... angular services folder
            my-service.js .............. example service
            my-service-spec.js ......... example service unit test
            my-service2.js ............. example service
            my-service2-spec.js ........ example service unit test
      /test ............................ test e2e and results
        /e2e ........................... test folder
      /vendor .......................... 3rd party libraries managed by bower
      /assets .......................... contains images (not created by default but included in /dist if added) and other resources
    /build ............................. 
      /dist ............................ folder where entire app packed is profived
      /tmp ............................. temp folder used for templtates.js and sass -> css file
      build.config.js .................. config file for gulp building process
      karma.config.js .................. config file for gulp unit test process
      protractor.config.js ............. config file for gulp e2e test process 
    /node_modules ...................... npm managed libraries used by gulp


Getting Started
-------------

Prerequisites: Node, Yeoman, Gulp and Bower.  Once Node is installed, do:

    npm install -g yo bower gulp sass

Next, install this generator:

    npm install -g generator-cg-gas

To create a project:

    mkdir MyNewAwesomeApp
    cd MyNewAwesomeApp
    yo cg-gas

Gulp Tasks
-------------

A description of every available task:

* **gulp serve** - When this task runs, the build will take care of watching filea. Every time you change a file into the `app/` folder, the build recompiles every file, and your browser will reload automagically showing you changes.
You just need to add new JavaScript and css files in the `app/index.html` file.
* **gulp serve:dist** - This task will run jshint and unit tests under the `app/test/unit` folder (thanks to `karma runner`), and create a fully-optimized version of your application under the `build/dist/` folder. The optimization consists of concatenate, minify and compress js and css files, optimize images, and put every template into a js file loaded by the application.
A code coverage report will be available inside the `app/test/unit-results`.
* **gulp serve:tdd** - Just like `gulp serve` but in continuous unit testing environment.
* **gulp test:unit** - For running unit tests one time then exit.
* **gulp test:e2e** - Run end-to-end tests inside the `app/test/e2e` folder with `protractor`. If a test fails, you should find a screenshot of the page inside the `app/test/screenshots` folder.
**Note that you need to have the application running in order to run e2e tests. You can launch this task from another terminal instance.**


Yeoman Subgenerators
-------------

There are a set of subgenerators to initialize empty Angular components.  Each of these generators will:

* Create one or more skeleton files (javascript, SASS, html, spec etc) for the component type.
* Update index.html and add the necessary `script` tags.
* Update app.less and add the @import as needed.
* For partials, update the app.js, adding the necessary route call if a route was entered in the generator prompts.

There are generators for `directive`,`partial`,`service`, `filter`, `module`, and `modal`.

Running a generator:

    yo cg-gas:directive my-awesome-directive
    yo cg-gas:partial my-partial
    yo cg-gas:service my-service
    yo cg-gas:filter my-filter
    yo cg-gas:module my-module
    yo cg-gas:modal my-modal
    yo cg-gas:architecture  (file containing architecture has to be done)

The name paramater passed (i.e. 'my-awesome-directive') will be used as the file names.  The generators will derive appropriate class names from this parameter (ex. 'my-awesome-directive' will convert to a class name of 'MyAwesomeDirective').  Each sub-generator will ask for the folder in which to create the new skeleton files.  You may override the default folder for each sub-generator in the `.yo-rc.json` file.

The modal subgenerator is a convenient shortcut to create partials that work as modals for Bootstrap v3.1 and Angular-UI-Bootstrap v0.10 (both come preconfigured with this generator).  If you choose not to use either of these libraries, simply don't use the modal subgenerator.

Subgenerators are also customizable.  Please read [CUSTOMIZING.md](CUSTOMIZING.md) for details.

Architecture
-------------
With sub generators yo cg-gas:architecture you can generate the first stub architecture through a simple json file that describe the entire application.
In this way is possible to startup more faster your app.

Following this simple steps:
```
    $ mkdir MyNewAwesomeApp
    $ yo cg-gas ..............    creates the entire application scafolds  [this generator is optimized for Angular UI Router]
    $ touch architecture.json
        Example code:             cat and past json first draft into the file
        {   "appname": "scloby",
            "modules": [
                { "name": "module1",
                  "partials": [
                                { "name": "partial1" }
                              ],
                  "services": [
                                { "name": "service1" }                    
                              ],
                  "filters":  [
                                { "name": "filter1" }
                              ],
                  "directives": [
                                { "name": "directive1",
                                  "needpartial": true
                                }                    
                              ],
                  "modals": [
                                {"name": "modal1"}
                            ]
                },
                { "name": "module2",
                  "partials": [
                                {"name": "partial1"}
                              ],
                  "services": [
                                {"name": "service1"},
                                {"name": "service2"}
                              ]       
                }
          ]
        }
    $ yo cg-gas:architecture    scaffold your app 
```
This will create the first architecture structure.
NOTE: becareful, when you start to code, is possible that if you run this subgenerator your code will be replaced with a new empty stub.


Submodules
-------------

Submodules allow you to more explicitly separate parts of your application.  Use the `yo cg-angular:module my-module` command and specify a new subdirectory to place the module into.  Once you've created a submodule, running other subgenerators will now prompt you to select the module in which to place the new component.

Preconfigured Libraries
-------------

The new app will have a handful of preconfigured libraries included. This includes Angular 1.2, Bootstrap 3, AngularUI Bootstrap, AngularUI Utils, FontAwesome 4, JQuery 2, Underscore 1.5, and Moment 2.5.  You may of course add to or remove any of these libraries.  But the work to integrate them into the app and into the build process has already been done for you.

Build Process
-------------

The project will include a ready-made Gulp build that will:

* Build all the SASS files into one minified CSS file.
* Uses [gulp-html2js](https://github.com/fraserxu/gulp-html2js) to turn all your partials into Javascript.
don't have to use the array syntax.
* Concatenates and minifies all Javascript into one file.
* Replaces all appropriate script references in `index.html` with the minified CSS and JS files.
* Minifies any images in `/build/dist/assets/images`.
* Minifies the `index.html`.
* Copies any extra files necessary for a distributable build (ex.  Font-Awesome font files, etc).

The resulting build loads only a few highly compressed files.


Release History
-------------
* 19/11/2014 - v3.3.3 - Changed AngularJS from 1.2 to 1.3 and all other dependences, plus module fix folders
* 24/10/2014 - v3.3.1a - Merging Gulp angular-kickstart management and app structure. 
* 24/10/2014 - v3.2.1 - Fork from cg-angular, main refactor to cg-gas for Sass and Gulp, new subgenerator architecture
* 7/6/2014 - v3.1.2 - Fix for directive template URLs with backslashes on Windows.
* 6/10/2014 - v3.1.1 - Fix for backslashes being used in injected routes/tags on subgenerators.
* 5/1/2014 - v3.1.0 - New subgenerators for modules and modals.  Replaced grunt-contrib-jasmine with grunt-karma.  Karma allows us to test against actual browsers other than PhantomJS.
* 3/10/2014 - v3.0.2 - Fix for directive files not being named correctly.  Fix for htmlmin from affecting some Bootstrap styles.
* 3/03/2014 - v3.0.0 - All subgenerators now ask the user for a directory enabling any user-defined project structure.  Gruntfile has been altered to allow scripts, partials, and LESS files to be located anywhere in the project directory structure.  An option to use `angular-ui-router` is now available when initializing a new project. `js/setup.js` and `css/app.less` moved to `app.js` and `app.less`.  `grunt server` is now `grunt serve`.  Inside `index.html` all user script tags are grouped together instead of split out into groups for services/filters/etc.  New ability to customize the subgenerators.
* 2/10/2014 - v2.1.1 - Fix for the directive spec file named with a .less extension.
* 1/06/2014 - v2.1.0 - Nice enhancements for unit testing.  Specs are now placed in the same directory as the component they're testing.  Additionally, unit tests are now run during `grunt server` allowing for an easy and efficient test-driven workflow.
* 12/30/2013 - v2.0.0 - Big Update.  Angular 1.2 and Bootstrap 3.  Newer versions of Angular UI, Font Awesome, and JQuery.  Lodash was replaced with Underscore.  Lots of other small changes.
* 9/06/2013 - V1.0.4 - Fixed templating issue with generated specs for `yo cg-angular:service` subgenerator.
* 8/29/2013 - V1.0.3 - Renamed `/lib` back to `/bower_components` as clarity trumps brevity.  Renamed `/bin` to `/dist`. Fixed spelling error in generated directive's js template location.  Moved up to later version of `yeoman-generator` dependency to solve "Cannot read bold of undefined" error coming from Yeoman.  JSHint options now read from `.jshintrc`.  And more small stuff.
* 7/08/2013 - V1.0.2 - Added utf8 charset to index.html.  Fix for "EMFile, too many open files" on `grunt watch` by no longer watching the `lib` folder.
* 6/20/2013 - v1.0.1 - Fixed a ton of known issues.  Replaced `grunt-regarde` with `grunt-contrib-watch`.  Fixed and tweaked the unit test specs and `grunt test`.  Fixed issues with the build.  Generator is now ready for real use.
* 6/18/2013 - v1.0.0 - Initial release of template as Yeoman generator.
