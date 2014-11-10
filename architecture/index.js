'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var cgUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');
var async = require('async');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var ArchitectureGenerator = module.exports = function ArchitectureGenerator(args, options, config) {

    yeoman.generators.Base.apply(this, arguments);
    yeoman.generators.Base.apply(this, arguments);

    if(args!==undefined && args=='skipinit')
        this.skipinit = true;
    else 
        this.skipinit = false

};

util.inherits(ArchitectureGenerator, yeoman.generators.Base);

ArchitectureGenerator.prototype.askForGenerateArchitecure = function askFor() {
    var cb = this.async();

    var prompts = [{
        name: 'architecturePath',
        message: 'Where is defined your architecture?',
        default: path.basename(process.cwd()+'/architecture.json')
    }];

    this.prompt(prompts, function (props) {
        this.architecturePath = props.architecturePath;
        cb();
    }.bind(this));
};


ArchitectureGenerator.prototype.start = function start() {
    var self = this;
    var chainQueueFunctions = [];

    var module = function(name, dir, cb){
        var moduleOptions = {
            name: name                     //[required]            
        };

        var defaultDir = '';
        if(dir) 
            defaultDir = dir+'/'+name; 
        else 
            defaultDir = 'app/'+name ;

        var options = {
            moduleoptions: moduleOptions,
            defaultDir :  defaultDir      //[optional, not defined use app/<name> path] 
        }

        self.invoke("cg-gas:module", {args: [moduleOptions.name], options: options}, cb);    
    }

    var partial = function(name, module, moduleDir, route, cb){
        var partialOptions = {
            name: name,                     //[required]
            route: route      //[required, not defined not set url for partial             
        };

        var defaultDir = '';
        if(moduleDir) 
            defaultDir = moduleDir+'/'+module+'/partial/'+name; 
        else 
            defaultDir = 'app/'+module+'/partial/'+name ;


        var options = {
            partialoptions: partialOptions, 
            selectedmodule: module,
            defaultDir :  defaultDir //[optional, not defined use app/<module> path] 
        }
        
        self.invoke("cg-gas:partial", {args: [partialOptions.name], options: options});    
        setTimeout(function(){
            cb();    
        },500)

    }

    var service = function(name, module, moduleDir,  cb){
        var serviceOptions = {
            name: name                     //[required]
        };

        var defaultDir = '';
        if(moduleDir) 
            defaultDir = moduleDir+'/'+module+'/service/'+name; 
        else 
            defaultDir = 'app/'+module+'/service/'+name  ;

        var options = {
            serviceoptions: serviceOptions, 
            selectedmodule: module,
            defaultDir : defaultDir //[optional, not defined use app/<module> path] 
        }

        self.invoke("cg-gas:service", {args: [serviceOptions.name], options: options});    
        setTimeout(function(){
            cb();
        },500)
    }

    var directive = function(name, module, moduleDir, needpartial, cb){
        var directiveOptions = {
            name: name,                    //[required]
            needpartial: needpartial        //[required] Y/n
        };

        var defaultDir = '';
        if(moduleDir) 
            defaultDir = moduleDir+'/'+module+'/directive/'+name; 
        else 
            defaultDir = 'app/'+module+'/directive/'+name  ;

        var options = {
            directiveoptions: directiveOptions, 
            selectedmodule: module,
            defaultDir :  defaultDir //[optional, not defined use app/<module> path] 
        }

        self.invoke("cg-gas:directive", {args: [directiveOptions.name], options: options});    
        setTimeout(function(){
            cb();
        },500)
    }

    var filter = function(name, module, moduleDir, cb){
        var filterOptions = {
            name: name                     //[required]
        };

        var defaultDir = '';
        if(moduleDir) 
            defaultDir = moduleDir+'/'+module+'/filter/'+name; 
        else 
            defaultDir = 'app/'+module+'/filter/'+name  ;


        var options = {
            filteroptions: filterOptions, 
            selectedmodule: module,
            defaultDir : defaultDir  //[optional, not defined use app/<module> path] 
        }

        self.invoke("cg-gas:filter", {args: [filterOptions.name], options: options});    
        setTimeout(function(){
            cb();
        },500)
    }

    var modal = function(name, module, moduleDir, cb){
        var modalOptions = {
            name: name                     //[required]
        };

        var defaultDir = '';
        if(moduleDir) 
            defaultDir = moduleDir+'/'+module+'/modal/'+name; 
        else 
            defaultDir = 'app/'+module+'/modal/'+name  ;

        var options = {
            modaloptions: modalOptions, 
            selectedmodule: module,
            defaultDir : defaultDir //[optional, not defined use app/<module> path] 
        }

        self.invoke("cg-gas:modal", {args: [modalOptions.name], options: options});    
        setTimeout(function(){
            cb();
        },500)
    }

    var chain = function(architecture){
        for (var i in architecture.modules) {
            var module = architecture.modules[i];
            putInChain('module',module.name, module.dir);

            for (var i in module.partials) {
              var partial = module.partials[i];
              putInChain('partial',partial.name,module.name, module.dir, partial.route);
            }

            for (var i in module.services) {
              var service = module.services[i];
              putInChain('service',service.name,module.name, module.dir);
            }

            for (var i in module.directives) {
              var directive = module.directives[i];
              putInChain('directive',directive.name,module.name, module.dir , directive.needpartial);
            }

            for (var i in module.filters) {
              var filter = module.filters[i];
              putInChain('filter',filter.name,module.name, module.dir);
            }

            for (var i in module.modals) {
              var modal = module.modals[i];
              putInChain('modal',modal.name,module.name, module.dir);
            }         
        }

        executeChain();
    }

    var putInChain = function(){
        var arg0 = arguments[0];
        var arg1 = arguments[1];
        var arg2 = arguments[2];
        var arg3 = arguments[3];
        var arg4 = arguments[4];
        var arg5 = arguments[5];
        var arg6 = arguments[6];
        var arg7 = arguments[7];

        var fnStub = function(cb){
            if(arg0==='module')
                module(arg1,arg2,cb);
            else if(arg0==='partial')
                partial(arg1,arg2,arg3,arg4,cb); 
            else if(arg0==='service')
                service(arg1,arg2,arg3,cb);     
            else  if(arg0==='directive')
                directive(arg1,arg2,arg3,arg4,cb); 
            else  if(arg0==='filter')
                filter(arg1,arg2,arg3,cb); 
            else  if(arg0==='modal')
                modal(arg1,arg2,arg3,cb); 
            else
                this.log.writeln("Subgenerator "+arg0+" is not defined");

        }

        chainQueueFunctions.push(fnStub);
    }

    var executeChain = function(){
        async.waterfall(chainQueueFunctions, function (err, result) {
           // result now equals 'done'    
        });
    }

    this.architecture = JSON.parse(""+this.readFileAsString(this.architecturePath));

    //  APP OK TERMINATO
    var appOptions = {
        name: this.architecture.appname,    //[required]
        uirouter: this.architecture.uirouter     //[optional]
    };

    /*if(!this.skipinit){
        self.invoke("cg-gas", {options: {appname: this.architecture.appname, appoptions: appOptions, callback: chain}});
    }*/   
    
    chain(this.architecture);  //Sostituire al termine con la riga superiore

};