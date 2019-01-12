/* global describe, test, expect */
const { Province, sampleProvinceData } = require('../src/production_plan')

describe('Province', function () {
  test('#shortfall', function () {
    const asia = new Province(sampleProvinceData())
    expect(asia).toHaveProperty('shortfall', 5)
  })
})
