(function () {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope) {
        $rootScope.loader = true;
    }

})();
