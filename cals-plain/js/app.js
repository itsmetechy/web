"use strict";
var startResearch = angular.module('startResearch', []);

(function(ng, app) {
    "use strict";
    app.controller('MainController', ['$scope', '$http', function($scope, $http) {
        $scope.usedCars = 'new';

        /*
        * Define which newType checkboxes are selected at app load
        * */
        $scope.newType = {
            'new': true,
            'used': false
        };
        /*
        * Supports error like messaging when the user forgets to populate a required field
        * */
        $scope.flagMissing = false;
        /*
        * Where the CTA will take the user
        * */
        $scope.researchUrl = '';
        /*
        * The current user selected make
        * */
        $scope.makeSelect = '';
        /*
        * The current user selected model
        * */
        $scope.modelSelect = '';
        /*
        * The current user selected year
        * */
        $scope.yearSelect = '';
        /*
        * An object to store new, used, or newused vehicles
        * */
        $scope.currentVehicles = {};

        /*
        * Determine what the status is of newType
        * new, used, or newused (both or none)
        * */
        $scope.whatIsSelectedNewType = function() {
            var type = 'newused';
            if ($scope.newType['new'] !== $scope.newType.used) {
                if (true === $scope.newType['new']) {
                    type = 'new';
                } else {
                    type = 'used';
                }
            }
            return type;
        };

        /*
        * @todo This does not feel right, should a controller be doing this?
        * Maybe a service?
        * When the user changes the newType we need to update the makes and models lists and research urls. Sometimes we can keep the make/modelSelect the same
        * */
        $scope.changeNewType = function() {
            $scope.setCurrentVehicles();
            // Make exists
            if ('undefined' !== typeof $scope.currentVehicles[$scope.makeSelect]) {
                // update list
                // update make research url
                $scope.$broadcast('newtype-update-make-selected', $scope.currentVehicles);
                // Model exists
                if ('undefined' !== typeof $scope.currentVehicles[$scope.makeSelect].models[$scope.modelSelect]) {
                    // update list
                    // update model research url
                    $scope.$broadcast('newtype-update-model-selected', $scope.currentVehicles[$scope.makeSelect].models);
                    $scope.$broadcast('newtype-update-year');
                    // Model does not exist
                } else {
                    $scope.$broadcast('newtype-update-model-reset', $scope.currentVehicles[$scope.makeSelect].models);
                }
                // Make and Model do not exist
            } else {
                // update list
                // reset make and model research url and selected
                $scope.$broadcast('newtype-update-make-reset', $scope.currentVehicles);
                $scope.$broadcast('newtype-update-model-reset', $scope.currentVehicles);
            }
        };

        /*
        * @todo This does not feel right, should a controller be doing this?
        * Maybe a service?
        * */
        $scope.updateResearchUrl = function(url) {
            $scope.researchUrl = url;
        };
        /*
        * @todo This does not feel right, should a controller be doing this?
        * Maybe a service?
        * */
        $scope.setCurrentVehicles = function() {
            $scope.currentVehicles = $scope.vehicleTypes[$scope.whatIsSelectedNewType()];
        };
    } ]);

    /*
    * A direct to handle the cars by type anchors.
    * If used cars are checked we need to update the href to reflect the user's preference.
    * */
    app.directive('carsByTypeAnchor', function() {
        return {
            restrict: 'A',
            transclude: true,
            scope: true,
            template: '<div ng-transclude></div>',
            controller: function($scope, $element) {
                var $container = ng.element('.types');
                /* Determine if this is a new or used car click */
                this.click = function(event) {
                    var src = $element.attr('href');
                    event.preventDefault();
                    if ('undefined' !== typeof $scope.newusedParameters[$scope.whatIsSelectedNewType()]) {
                        window.location.href = src + $scope.newusedParameters[$scope.whatIsSelectedNewType()];
                    } else {
                        window.location.href = src;
                    }
                };
                this.chgb = function(event) {
                    $container.removeClass(function(index, css) {
                        return (css.match(/\bvtype-\S+/g) || []).join(' ');
                    });
                    if ('mouseout' === event.type) {
                        // @todo make a query to get this data off the first element, may not be possible with not parent directive.
                        $container.addClass('vtype-compact');
                    } else {
                        $container.addClass('vtype-' + $element.data('type'));
                    }
                };
                $element.on('click', this.click);
                /*
                * @todo I do not enjoy this on off event jazz. I feel mouseout could be called less often.
                * */
                $element.on('mouseout', this.chgb);
                $element.on('mouseover', this.chgb);
            },
            link: function(scope, elem, attr) {
                /* convert our params string into a JS object */
                scope.newusedParameters = scope.$eval(attr.newusedParameters);
            }
        }
    });

    app.directive('chooseMakeDropdown', ['$http', function($http) {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div ng-transclude></div>',
            controller: function($scope, $element) {
                /*
                * @todo I would like this to be private. Do I need to create a service for this?
                * @todo Should I make a service for requesting vehicles as well? Can it be configured from the dom?
                * */
                $scope.processVehicleData = function(vehicles) {
                    $element.addClass('fetching');
                    $scope.vehicleTypes = {
                        'new': {},
                        'used': {},
                        'newused': {}
                    };
                    ng.forEach(vehicles, function(v, k) {
                    var vehicles = $scope.vehicleTypes,
							make = ng.lowercase(v.make), //Normalized to lowercase for sorting of the makes see makeName for display name IM-25302
							model = ng.lowercase(v.model); //Normalized to lowercase for sorting of the makes see makeName for display name IM-25302
                        // new || used
                        // Create a new make and model object
                        if ('undefined' === typeof vehicles[v.type][make]) {
                            vehicles[v.type][make] = {};
                            vehicles[v.type][make]['makeName'] = v.make;

                            vehicles[v.type][make]['makeUrl'] = v.makeUrl;
                            vehicles[v.type][make]['models'] = {};
                            vehicles[v.type][make]['models'][model] = {
                                modelName: v.model,
                                modelUrl: v.modelUrl
                            };
                            // add model object to existing make object
                        } else {
                            vehicles[v.type][make]['models'][model] = {
                                modelName: v.model,
                                modelUrl: v.modelUrl
                            };
                        }
                        // Both new && used
                        if ('undefined' === typeof vehicles['newused'][make]) {
                            vehicles['newused'][make] = {};
                            vehicles['newused'][make]['makeName'] = v.make;
                            vehicles['newused'][make]['makeUrl'] = v.makeUrl;
                            vehicles['newused'][make]['models'] = {};
                            vehicles['newused'][make]['models'][model] = {
                                modelName: v.model,
                                modelUrl: v.modelUrl
                            };
                        } else {
                            // If a Make object's model has not been defined do so
                            if ('undefined' === typeof vehicles['newused'][make]['models'][v.model]) {
                                vehicles['newused'][make]['models'][model] = {
                                    modelName: v.model,
                                    modelUrl: v.modelUrl
                                };
                                // Make object's model has already been defined? New always takes precedence over old
                            } else {
                                if ('new' === v.type) {
                                    vehicles['newused'][make]['models'][model] = {
                                        modelName: v.model,
                                        modelUrl: v.modelUrl
                                    };
                                }
                            }
                        }
                    });
                };

                /*
                * Get makes and models, this data is required to make module work.
                * */
                $http({
                    method: 'POST',
                    url: $element.data('url'),
                    data: {
                        template: $element.data('template')
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                }).success(function(data, status, headers, config) {
                    console.log('data');
                    if ('undefined' !== typeof data.d.vehicles) {
                        console.log('test success');
                        $scope.processVehicleData(data.d.vehicles);
                        $element.removeClass('fetching');
                        $scope.setCurrentVehicles();
                        $scope.makes = $scope.currentVehicles;
                    }
                }).error(function(data, status, headers, config) {
                    // @todo something!
                    console.log('test failure');
                    console.log('Issue getting models and models in main ctrl');
                });

                /* When you click a Make from the drop down */
                $scope.clickMake = function(make, displayName) {
                    if ($scope.makeSelect !== make) {
                        $scope.models = [];
                        $scope.years = [];
                        $scope.modelSelect = '';
                        $scope.yearSelect = '';
                        $scope.makeSelect = displayName;
                        $scope.researchUrl = $scope.vehicleTypes[$scope.whatIsSelectedNewType()][make].makeUrl;
                        // e.g. $scope.vehicleTypes.new.Chevrolet.models;
                        $scope.models = $scope.vehicleTypes[$scope.whatIsSelectedNewType()][make].models;
                    }
                };

                /*
                * @todo this in not very dry
                * Maybe this should be a service? That we pass element to
                * Simulate select dropdown effects with a class and style
                * */
                $scope.toggleMakeSelected = function() {
                    $element.toggleClass('selected');
                };

                /* An event to let us know the user has change the New Type */
                $scope.$on('newtype-update-make-selected', function(event, makes) {
                    $scope.makes = makes;
                    $scope.updateResearchUrl(makes[$scope.makeSelect].makeUrl);
                });
                $scope.$on('newtype-update-make-reset', function(event, makes) {
                    $scope.makes = makes;
                    $scope.makeSelect = '';
                    $scope.updateResearchUrl('');
                });
            }
        }
    } ]);

    app.directive('chooseModelDropdown', ['$http', function($http) {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div ng-transclude></div>',
            controller: function($scope, $element) {
                /*
                * When you click a model from the dropdown
                * */
                $scope.clickModel = function(model, displayName) {
                    var makeSelect = ng.lowercase($scope.makeSelect); // The normalized version of make. see processVehicleData
                    if ($scope.modelSelect !== model) {
                        $scope.years = [];
                        $scope.yearSelect = '';
                        $scope.modelSelect = displayName;
                        // E.g. $scope.vehicleTypes.new.Audi.models.A3.modelUrl
                        $scope.researchUrl = $scope.vehicleTypes[$scope.whatIsSelectedNewType()][makeSelect].models[model].modelUrl;
                        $scope.getYears();
                    }
                };

                /*
                * @todo this in not very dry
                * Maybe this should be a service? That we pass element to
                * Simulate select dropdown effects with a class and style
                * */
                $scope.toggleModelSelected = function() {
                    $element.toggleClass('selected');
                };

                /*
                * An event to let us know the user changed the newType
                * */
                $scope.$on('newtype-update-model-selected', function(event, models) {
                    $scope.models = models;
                    $scope.updateResearchUrl(models[$scope.modelSelect].modelUrl);
                });
                $scope.$on('newtype-update-model-reset', function(event, models) {
                    $scope.models = models;
                    $scope.modelSelect = '';
                    // If there is no current make there is no researchURL, If there is a current make the research url should be for that make defined by the make dropdown
                    if ('undefined' === typeof $scope.currentVehicles[$scope.makeSelect]) {
                        $scope.updateResearchUrl('');
                    }
                });
            }
        }
    } ]);

    app.directive('chooseYearDropdown', ['$http', function($http) {
        return {
            restrict: 'A',
            transclude: true,

            template: '<div ng-transclude></div>',
            controller: function($scope, $element) {
                var that = this;
                $scope.years = [];

                $scope.getYears = function() {
                    var newType = $scope.whatIsSelectedNewType();
                    $element.addClass('fetching');
                    $http({
                        method: 'POST',
                        url: $element.data('url'),
                        data: {
                            neworused: newType,
                            vehicleMake: $scope.makeSelect,
                            vehicleModel: $scope.modelSelect,
                            template: $element.data('template')
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json"
                    }).success(function(data, status, headers, config) {
                        if ('undefined' !== typeof data.d) {
                            that.setYears(data.d);
                            $element.removeClass('fetching');
                        } else {
                            // @todo something!
                            console.log('Issue with years data');
                        }

                    }).error(function(data, status, headers, config) {
                        // @todo something!
                        console.log('Issue getting years');
                    });
                };

                /*
                * When you click a year from the dropdown
                * */
                $scope.clickYear = function(year, yearUrl) {
                    if ($scope.yearSelect !== year) {
                        $scope.yearSelect = year;
                        $scope.updateResearchUrl(yearUrl);
                    }
                };

                /*
                * @todo this in not very dry
                * Maybe this should be a service? That we pass element to
                * Simulate select dropdown effects with a class and style
                * */
                $scope.toggleYearSelected = function() {
                    $element.toggleClass('selected');
                };

                /*
                * An event to let us know the user changed the newType
                * */
                $scope.$on('newtype-update-year', function() {
                    $scope.yearSelect = '';
                    $scope.getYears();
                });

                /*
                * Overkill
                * */
                this.setYears = function(years) {
                    if (0 <= years.length) {
                        $scope.years = years;
                    }
                };
            }
        }
    } ]);

    app.directive('researchGo', [function() {
        return {
            restrict: 'A',
            transclude: true,
            template: '<div ng-transclude></div>',
            scope: {
                flagMissing: '=',
                makesSelect: '=',
                modelsSelect: '=',
                yearsSelect: '=',
                researchUrl: '=',
                type: '='
            },
            controller: function($scope, $element, $attrs) {
                // Evaluate string into object.
                $scope.newusedParameters = $scope.$eval($attrs.newusedParameters);
                // Bind research routing logic to research click
                $element.on('click', function(event) {
                    // If check required fields
                    if (
							0 === $scope.makesSelect.length
						) {
                        event.preventDefault();
                        $scope.flagMissing = true;
                        $scope.$apply();
                    } else {
                        var url = $scope.researchUrl,
							type = $scope.type;
                        // Apply new, used, newused query strings to url when selecting make or model, if the newused perimeter exists.
                        if (0 === $scope.yearsSelect.length && 'undefined' !== typeof $scope.newusedParameters[type]) {
                            $element.attr('href', url + $scope.newusedParameters[type]);
                        } else {
                            $element.attr('href', url);
                        }
                    }
                });
            }
        }
    } ]);
})(angular, startResearch);