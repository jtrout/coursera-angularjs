(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                menuItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsController() {
        var list = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrow = this;

        narrow.findMenuItems = function (searchTerm) {
            if (searchTerm && searchTerm !== null) {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

                promise.then(function (foundItems) {
                    narrow.found = foundItems;
                    console.log('Returned items from search service:', foundItems);
                })
                    .catch(function (error) {
                        console.log("Something went terribly wrong.");
                    });
            } else {
                // initialize found if not already, and ensure it's empty so we can show the 'nothing found' message
                narrow.found = [];
            }
        };

        narrow.removeItem = function (itemIndex) {
            narrow.found.splice(itemIndex, 1);
        };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];

                for (var i = 0; i < result.data.menu_items.length; i++) {
                    if (result.data.menu_items[i].name.toLowerCase().indexOf(searchTerm) > -1 || result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) > -1) {
                        foundItems.push(result.data.menu_items[i]);
                    }
                }

                console.log('Found Items:', foundItems);

                // return processed items
                return foundItems;
            });
        };
    }

})();
