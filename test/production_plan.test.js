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
})
