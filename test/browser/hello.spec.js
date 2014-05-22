var chai = require('chai');
var expect = chai.expect;

describe('it works', function(){
  it('jQuery via browserify is available', function() {
    $.should.exist();
  });
});