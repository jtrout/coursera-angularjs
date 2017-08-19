(function () {
    'use strict';

    angular
        .module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.LunchItems = '';
        $scope.ItemCountMessage = '';
        $scope.ItemCountAlertClass = '';
        $scope.ItemCountValidClass = '';
        $scope.LunchItemsCount = 0;
        $scope.CheckItemCount = function () {
            if ($scope.LunchItems === '') {
                $scope.ItemCountMessage = 'Please enter data first';
                $scope.ItemCountAlertClass = 'alert-warning';
                $scope.ItemCountValidClass = 'has-error';
            } else {
                var lunchItems = $scope.LunchItems.split(','),
                    len = lunchItems.length, i;

                for (i = 0; i < len; i++)
                    lunchItems[i].trim() && lunchItems.push(lunchItems[i]);  // copy non-empty values to the end of the array

                lunchItems.splice(0, len);  // cut the array and leave only the non-empty values

                $scope.LunchItemsCount = lunchItems.length;
                switch ($scope.LunchItemsCount) {
                    case 1:
                    case 2:
                    case 3:
                        $scope.ItemCountMessage = 'Enjoy!';
                        $scope.ItemCountAlertClass = 'alert-success';
                        break;
                    default:
                        $scope.ItemCountMessage = 'Too much!';
                        $scope.ItemCountAlertClass = 'alert-danger';
                }
                $scope.ItemCountValidClass = 'has-success';
            }
        };
    }
})();
