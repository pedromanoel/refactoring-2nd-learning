/* global describe, beforeEach, test, expect */
const { Province, sampleProvinceData } = require('../src/production_plan')

describe('Province', function () {
  let asia

  beforeEach(function () {
    asia = new Province(sampleProvinceData())
  })

  test('#shortfall', function () {
    expect(asia).toHaveProperty('shortfall', 5)
  })

  test('#profit', function () {
    expect(asia).toHaveProperty('profit', 230)
  })

  test('change production', function () {
    asia.producers[0].production = 20
    expect(asia.shortfall).toBe(-6)
    expect(asia.profit).toBe(292)
  })

  test('zero demand', function () {
    asia.demand = 0

    expect(asia.shortfall).toBe(-25)
    expect(asia.profit).toBe(0)
  })
})

describe('no producers', function () {
  let noProducers

  beforeEach(function () {
    const data = {
      name: 'No producers',
      producers: [],
      demand: 30,
      price: 20
    }

    noProducers = new Province(data)
  })

  test('#shortfall', function () {
    expect(noProducers.shortfall).toBe(30)
  })

  test('#profic', function () {
    expect(noProducers.profit).toBe(0)
  })
})
