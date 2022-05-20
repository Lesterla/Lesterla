var async = require('../lib');
var {expect} = require('chai');
var assert = require('assert');

describe('ensureAsync', () => {
    var passContext = function(cb) {
        cb(this);
    };

    it('defer sync functions', (done) => {
        var sync = true;
        async.ensureAsync((arg1, arg2, cb) => {
            expect(arg1).to.equal(1);
            expect(arg2).to.equal(2);
            cb(null, 4, 5);
        })(1, 2, (err, arg4, arg5) => {
            expect(err).to.equal(null);
            expect(arg4).to.equal(4);
            expect(arg5).to.equal(5);
            assert(!sync, 'callback called on same tick');
            done();
        });
        sync = false;
    });

    it('do not defer async functions', (done) => {
        var sync = false;
        async.ensureAsync((arg1, arg2, cb) => {
            expect(arg1).to.equal(1);
            expect(arg2).to.equal(2);
            async.setImmediate(() => {
                sync = true;
                cb(null, 4, 5);
                sync = false;
            });
        })(1, 2, (err, arg4, arg5) => {
            expect(err).to.equal(null);
            expect(arg4).to.equal(4);
            expect(arg5).to.equal(5);
            assert(sync, 'callback called on next tick');
            done();
        });
    });

    it('double wrapping', (done) => {
        var sync = true;
        async.ensureAsync(async.ensureAsync((arg1, arg2, cb) => {
            expect(arg1).to.equal(1);
            expect(arg2).to.equal(2);
            cb(null, 4, 5);
        }))(1, 2, (err, arg4, arg5) => {
            expect(err).to.equal(null);
            expect(arg4).to.equal(4);
            expect(arg5).to.equal(5);
            assert(!sync, 'callback called on same tick');
            done();
        });
        sync = false;
    });

});
