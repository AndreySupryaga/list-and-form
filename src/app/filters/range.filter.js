(function () {
    'use strict';

    /**
     * Range filter for age.
     * @param items {Array}
     * @param min {Number}
     * @param max {Number}
     * @returns {function}
     */
    angular.module('app')
        .filter('rangeFilter', function () {
            return function (items, min, max) {
                var result = [];
                min = parseInt(min);
                max = parseInt(max) || Number.MAX_VALUE;
                if (min) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].age >= min && items[i].age <= max) {
                            result.push(items[i]);
                        }
                    }
                    return result;
                }
                return items;
            };
        })

})();
