

const stripe = require('../testUtils').getSpyableStripe();
const { expect } = require('chai');

const PAYOUT_TEST_ID = 'po_testid1';

describe('Payouts Resource', () => {
  describe('retrieve', () => {
    it('Sends the correct request', () => {
      stripe.payouts.retrieve(PAYOUT_TEST_ID);
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: `/v1/payouts/${PAYOUT_TEST_ID}`,
        headers: {},
        data: {},
      });
    });
  });

  describe('create', () => {
    it('Sends the correct request', () => {
      stripe.payouts.create({
        amount: 200, currency: 'usd',
      });
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: '/v1/payouts',
        headers: {},
        data: { amount: 200, currency: 'usd' },
      });
    });
  });

  describe('update', () => {
    it('Sends the correct request', () => {
      stripe.payouts.update(PAYOUT_TEST_ID, {
        metadata: { key: 'value' },
      });
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: `/v1/payouts/${PAYOUT_TEST_ID}`,
        headers: {},
        data: { metadata: { key: 'value' } },
      });
    });
  });

  describe('cancel', () => {
    it('Sends the correct request', () => {
      stripe.payouts.cancel(PAYOUT_TEST_ID);
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'POST',
        url: `/v1/payouts/${PAYOUT_TEST_ID}/cancel`,
        headers: {},
        data: {},
      });
    });
  });

  describe('list', () => {
    it('Sends the correct request', () => {
      stripe.payouts.list();
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: '/v1/payouts',
        headers: {},
        data: {},
      });
    });
  });

  describe('listTransactions', () => {
    it('Sends the correct request', () => {
      stripe.payouts.listTransactions(PAYOUT_TEST_ID);
      expect(stripe.LAST_REQUEST).to.deep.equal({
        method: 'GET',
        url: `/v1/payouts/${PAYOUT_TEST_ID}/transactions`,
        headers: {},
        data: {},
      });
    });
  });
});
