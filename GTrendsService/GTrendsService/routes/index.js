'use strict';
module.exports = function (app) {
    var todoList = require('../controllers/trendsController');

    app.route('/trends')
        .get(todoList.list_all_tasks);
};