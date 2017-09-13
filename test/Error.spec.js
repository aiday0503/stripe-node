

require('./testUtils');

const Error = require('../lib/Error');
const { expect } = require('chai');

describe('Error', () => {
  it('Populates with type and message params', () => {
    const e = new Error('FooError', 'Foo happened');
    expect(e).to.have.property('type', 'FooError');
    expect(e).to.have.property('message', 'Foo happened');
    expect(e).to.have.property('stack');
  });

  describe('StripeError', () => {
    it('Generates specific instance depending on error-type', () => {
      expect(Error.StripeError.generate({ type: 'card_error' })).to.be.instanceOf(Error.StripeCardError);
      expect(Error.StripeError.generate({ type: 'invalid_request_error' })).to.be.instanceOf(Error.StripeInvalidRequestError);
      expect(Error.StripeError.generate({ type: 'api_error' })).to.be.instanceOf(Error.StripeAPIError);
    });

    it('Pulls in headers', () => {
      const headers = { 'Request-Id': '123' };
      const e = Error.StripeError.generate({ type: 'card_error', headers });
      expect(e).to.have.property('headers', headers);
    });

    it('Pulls in request IDs', () => {
      const e = Error.StripeError.generate({ type: 'card_error', requestId: 'foo' });
      expect(e).to.have.property('requestId', 'foo');
    });

    it('Pulls in HTTP status code', () => {
      const e = Error.StripeError.generate({ type: 'card_error', statusCode: 400 });
      expect(e).to.have.property('statusCode', 400);
    });
  });
});
