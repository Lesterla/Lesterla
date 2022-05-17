var async = require('../lib');
var {expect} = require('chai');
var _ = require('lodash');

describe("detect", () => {

    function detectIteratee(call_order, x, callback) {
        setTimeout(() => {
            call_order.push(x);
            callback(null, x == 2);
        }, x*5);
    }
});
