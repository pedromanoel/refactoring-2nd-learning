/* global describe, test, expect */

const Clock = require('../src/clock')

describe('Clock', () => {
  test('#today', () => {
    const now = Date.now()

    expect(Clock.today).toBeGreaterThanOrEqual(now)
  })
})
