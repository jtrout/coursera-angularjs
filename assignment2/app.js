(function () {
    'use strict';

    angular
        .module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
        toBuy.buyItem = function (boughtItemIndex) {
            ShoppingListCheckOffService.moveItemToBought(boughtItemIndex);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
        var itemsToBuy = [{ name: 'cookies', quantity: '10' },
            { name: 'Coke', quantity: '1' },
            { name: 'chips', quantity: '2' },
            { name: 'onions', quantity: '3' },
            { name: 'green peppers', quantity: '4' }
        ];
        var boughtItems = [];

        this.getBoughtItems = function () {
            return boughtItems;
        }

        this.getItemsToBuy = function () {
            return itemsToBuy;
        }

        this.moveItemToBought = function(itemIndex) {
            // Add the item from itemsToBuy to boughtItems
            boughtItems.push(itemsToBuy[itemIndex]);
            // Remove the item from boughtItems
            itemsToBuy.splice(itemIndex, 1);
        }
    }
})();
