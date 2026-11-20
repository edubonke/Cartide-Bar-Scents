import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/catalog.ts';
import {
  addToCart,
  calculateCartSummary,
  filterProducts,
  formatRand,
  removeFromCart,
  updateCartQuantity,
  validateCheckoutForm,
} from './storeLogic.ts';

test('formatRand formats ZAR prices cleanly', () => {
  assert.equal(formatRand(370), 'R370');
  assert.equal(formatRand(1240), 'R1,240');
});

test('filterProducts filters by scent family and search text', () => {
  const woody = filterProducts(PRODUCTS, 'Woody & Resin', '');
  assert.equal(woody.length, 2);
  assert.ok(woody.every((p) => p.scentFamily === 'Woody & Resin'));

  const neroli = filterProducts(PRODUCTS, 'All', 'neroli');
  assert.equal(neroli.length, 1);
  assert.equal(neroli[0]?.id, 'cbs-02');

  const empty = filterProducts(PRODUCTS, 'Citrus & Mineral', 'oud');
  assert.equal(empty.length, 0);
});

test('addToCart, updateCartQuantity, removeFromCart, and calculateCartSummary work end-to-end', () => {
  const firstProduct = PRODUCTS[0];
  assert.ok(firstProduct);

  let cart = addToCart([], firstProduct, 'brass-case', 1);
  assert.equal(cart.length, 1);
  assert.equal(cart[0]?.unitPrice, 370);

  let summary = calculateCartSummary(cart);
  assert.equal(summary.itemCount, 1);
  assert.equal(summary.subtotal, 370);
  assert.equal(summary.shippingFee, 65);
  assert.equal(summary.remainingForFreeShipping, 330);
  assert.equal(summary.total, 435);

  // Adding same product + variant increments quantity and crosses free shipping threshold (R700)
  cart = addToCart(cart, firstProduct, 'brass-case', 1);
  assert.equal(cart.length, 1);
  assert.equal(cart[0]?.quantity, 2);

  summary = calculateCartSummary(cart);
  assert.equal(summary.subtotal, 740);
  assert.equal(summary.shippingFee, 0);
  assert.equal(summary.remainingForFreeShipping, 0);
  assert.equal(summary.total, 740);

  // Adding a different variant creates a distinct line item
  cart = addToCart(cart, firstProduct, 'wax-refill', 1);
  assert.equal(cart.length, 2);
  assert.equal(calculateCartSummary(cart).itemCount, 3);

  // Decrementing quantity to zero removes the line item
  cart = updateCartQuantity(cart, firstProduct.id, 'wax-refill', -1);
  assert.equal(cart.length, 1);

  cart = removeFromCart(cart, firstProduct.id, 'brass-case');
  assert.equal(cart.length, 0);
  assert.equal(calculateCartSummary(cart).total, 0);
});

test('validateCheckoutForm rejects empty fields and accepts valid customer details', () => {
  const invalid = validateCheckoutForm({
    fullName: '',
    email: 'not-an-email',
    address: '12',
    city: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.address);
  assert.ok(invalid.errors.city);

  const valid = validateCheckoutForm({
    fullName: 'Thabo Mokoena',
    email: 'thabo@example.com',
    address: '42 Jan Smuts Avenue, Rosebank',
    city: 'Johannesburg',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
