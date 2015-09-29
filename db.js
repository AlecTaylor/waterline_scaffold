/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./typings/lodash/lodash.d.ts"/>
/// <reference path="./cust_typings/waterline.d.ts"/>
/// <reference path="./cust_typings/sails-postgresql.d.ts"/>
///// <reference path="typescript/src/lib/es6"/>
'use strict';
var Waterline = require('waterline');
var sails_postgresql = require('sails-postgresql');
var _ = require('lodash');
var User = require('./models/User');
var Utils = require('./utils');
exports.waterline = new Waterline();
function init_models() {
    exports.waterline.loadCollection(Waterline.Collection.extend(User.User));
}
exports.init_models = init_models;
function init_db_conn() {
    var config = {
        adapters: {
            url: process.env.RDBMS_URI,
            postgres: sails_postgresql
        },
        connections: {
            postgres: _.extend({
                adapter: 'postgres'
            }, Utils.url_to_config(process.env.RDBMS_URI))
        }
    };
    exports.waterline.initialize(config, function (err, ontology) {
        if (err) {
            return console.error(err);
        }
        // Tease out fully initialised models.
        var User = ontology.collections.user_tbl;
        // First we create a user.
        User.create({
            email: 'foo@bar.com',
            password: 'bfsdfsdf'
        }, function (err, model) {
            console.error('err = ', err);
            console.info('model = ', model);
        });
        console.log('User created');
    });
}
exports.init_db_conn = init_db_conn;
function init_all() {
    init_models();
    init_db_conn();
}
exports.init_all = init_all;
if (require.main === module) {
    init_all();
}
//# sourceMappingURL=db.js.map