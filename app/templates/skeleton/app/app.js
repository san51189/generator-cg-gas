angular.module('<%= _.camelize(appname) %>', ['ui.bootstrap','ui.utils','<%= routerModuleName %>','ngAnimate','templates']);
<% if (!uirouter) { %>
angular.module('<%= _.camelize(appname) %>').config(function($routeProvider) {

    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo:'/home'});

});
<% } %><% if (uirouter) { %>
angular.module('<%= _.camelize(appname) %>').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});
<% } %>
angular.module('<%= _.camelize(appname) %>').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
