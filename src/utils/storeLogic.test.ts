import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/catalog.ts';
import { addToCart, calculateCartSummary, createEnquiry, filterProducts, formatRand, removeFromCart, updateCartQuantity } from './storeLogic.ts';
test('only source-supported advertised pricing is displayed', () => {
  assert.equal(formatRand(370), 'R370');
  assert.equal(PRODUCTS.length,7);
  assert.deepEqual(PRODUCTS.filter(p=>p.advertisedPrice!==null).map(p=>[p.id,p.advertisedPrice]),[['black-optra',370]]);
});
test('category and product name filtering', () => {
  assert.equal(filterProducts(PRODUCTS,'Fresh & Vibrant','').length,2);
  assert.equal(filterProducts(PRODUCTS,'All','tobacco').length,1);
  assert.equal(filterProducts(PRODUCTS,'Fresh & Vibrant','tobacco').length,0);
});
test('add, update, remove and count fragrance enquiries', () => {
  let cart=addToCart([],PRODUCTS[0],2);
  cart=addToCart(cart,PRODUCTS[0]);
  cart=addToCart(cart,PRODUCTS[1]);
  assert.equal(calculateCartSummary(cart).itemCount,4);
  cart=updateCartQuantity(cart,PRODUCTS[0].id,-1);
  assert.equal(cart[0].quantity,2);
  cart=removeFromCart(cart,PRODUCTS[1].id);
  assert.equal(cart.length,1);
});
test('enquiry lists selected fragrances and requests confirmation, no invented charges', () => {
  const msg=createEnquiry(addToCart([],PRODUCTS[0],2),PRODUCTS);
  assert.ok(msg.includes('2 × Green Sapphire (100 ml)'));
  assert.ok(msg.includes('confirm current prices, availability and delivery'));
  assert.ok(!msg.includes('R370'));
});
