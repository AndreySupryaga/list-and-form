(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config(toastrConfig, $uibTooltipProvider) {
        
        // Set options third-party lib
        $uibTooltipProvider.options({popupDelay: 400});
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-bottom-right';
        toastrConfig.progressBar = true;
    }

})();
