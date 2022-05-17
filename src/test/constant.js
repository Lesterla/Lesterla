var async = require('../lib');
var {expect} = require('chai');

describe('constant', () => {

    it('basic usage', (done) => {
        var f = async.constant(42, 1, 2, 3);
        f((err, value, a, b, c) => {
            expect(err).to.equal(null);
            expect(value).to.equal(42);
            expect(a).to.equal(1);
            expect(b).to.equal(2);
            expect(c).to.equal(3);
            done();
        });
    });

    });
