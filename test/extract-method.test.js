/* global describe, beforeEach, afterEach, test, expect */

const { printOwing } = require('../src/extract-method')

describe('Extract method refactoring', () => {
  const realConsoleLog = console.log
  let capturedLog

  beforeEach(() => {
    capturedLog = []
    console.log = message => capturedLog.push(message)
  })

  afterEach(() => {
    console.log = realConsoleLog
  })

  test('empty invoice', () => {
    const invoice = { orders: [] }

    printOwing(invoice)

    expect(capturedLog).toContain('amount: 0')
  })
})
