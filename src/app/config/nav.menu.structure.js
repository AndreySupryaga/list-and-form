(function () {
    'use strict';

    angular
        .module('app')
        .value('navMenuStructure', [
            {
                title: 'Item table view',
                href: '/#/users/table'
            },
            {
                title: 'Item tile view',
                href: '/#/users/tile'
            },
            {
                title: 'Add user',
                href: '/#/user/add'
            }
        ]);

})();
