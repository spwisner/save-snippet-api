'use strict';

// Allow chai syntax like `expect(foo).to.be.ok;`
// jshint -W030

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

const snippet = require('../lib/snippet');

describe('Sync', function () {
  it('is true', function () {
    expect(snippet.sync(true)).to.be.true;
  });
});

describe('Async', function () {
  it('is true', function (done) {
    snippet.async(true, function (error, value) {
      if (error || value !== true) {
        error = error || new Error(`value is ${value}`);
      }

      done(error);
    });
  });
});

describe('Promise', function () {
  it('is true', function () {
    return expect(snippet.promise(true)).to.eventually.be.true;
  });
});
