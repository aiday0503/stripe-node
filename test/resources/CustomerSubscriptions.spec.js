

const { resources } = require('../../lib/stripe');
const stripe = require('../testUtils').getSpyableStripe();
const { expect } = require('chai');

const CUSTOMER_TEST_ID = 'customerIdTest999';

// Create new CustomerSubscription instance with pre-filled customerId:
const customerSubscription = new resources.CustomerSubscriptions(
  stripe,
  { customerId: CUSTOMER_TEST_ID },
);

// Use spy from existing resource:
customerSubscription._request = stripe.customers._request;

describe('CustomerSubscription Resource', () => {
  describe('retrieve', () => {
    it('Sends the correct request', () => {
      customerSubscription.retrieve('subscriptionIdFoo456');
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: `/v1/customers/${CUSTOMER_TEST_ID}/subscriptions/subscriptionIdFoo456`,
        headers: {},
        data: {},
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      customerSubscription.create({
        plan: 'gold', quantity: '12',
      });
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: `/v1/customers/${CUSTOMER_TEST_ID}/subscriptions`,
        headers: {},
        data: { plan: 'gold', quantity: '12' },
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      customerSubscription.update('subscriptionIdFoo456', {
        name: 'Bob M. Baz',
      });
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: `/v1/customers/${CUSTOMER_TEST_ID}/subscriptions/subscriptionIdFoo456`,
        headers: {},
        data: { name: 'Bob M. Baz' },
      });
    });
  });

  describe('del', () => {
    it('Sends the correct request', () => {
      customerSubscription.del('subscriptionIdFoo456');
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'DELETE',
        url: `/v1/customers/${CUSTOMER_TEST_ID}/subscriptions/subscriptionIdFoo456`,
        headers: {},
        data: {},
      });
    });
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      customerSubscription.list();
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: `/v1/customers/${CUSTOMER_TEST_ID}/subscriptions`,
        headers: {},
        data: {},
      });
    });
  });

  describe('Discount methods', () => {
    describe('deleteDiscount', () => {
      it('Sends the correct request', () => {
        customerSubscription.deleteDiscount('customerIdFoo321', 'subscriptionIdBar654');
        expect(stripe.LAST_REQUEST).to.deep.equal({
          method: 'DELETE',
          url: '/v1/customers/customerIdFoo321/subscriptions/subscriptionIdBar654/discount',
          headers: {},
          data: {},
        });
      });
    });
  });
});
