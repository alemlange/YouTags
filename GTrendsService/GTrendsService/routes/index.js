'use strict';
module.exports = function (app) {
    var trendsConroller = require('../controllers/trendsController');

    app.route('/trends')
        .get(trendsConroller.list_all_tasks);
};