/* global describe, test, expect */

const { price } = require('../src/extract-variable')

describe('#price', () => {
  test('quantity is zero', () => {
    const order = { quantity: 0, itemPrice: 10 }
    expect(price(order)).toEqual(0)
  })

  test('price is zero', () => {
    const order = { quantity: 1, itemPrice: 0 }
    expect(price(order)).toEqual(0)
  })

  test('quantity discount after 500', () => {
    const order = { quantity: 500, itemPrice: 10 }
    const discountOrder = { quantity: 501, itemPrice: 10 }

    expect(price(discountOrder)).toBeLessThan(price(order) + 10)
  })

  test('shipping costs 10% when total cost is below 100', () => {
    const order = { quantity: 1, itemPrice: 100 }
    expect(price(order)).toBeCloseTo(110)
  })

  test('shipping costs 10% larger 100', () => {
    const order = { quantity: 1, itemPrice: 99 }
    expect(price(order)).toBeCloseTo(99 + 9.9)
  })
})
