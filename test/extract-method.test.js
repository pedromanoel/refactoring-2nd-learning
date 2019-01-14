/* global describe, beforeEach, afterEach, test, expect */
const Clock = {
  today: new Date(2019, 0, 1)
}

const { printOwing } = require('../src/extract-method')(Clock)

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

  test('print header', () => {
    const invoice = { orders: [] }

    printOwing(invoice)

    expect(capturedLog.slice(0, 3)).toEqual([
      '***********************',
      '**** Customer Owes ****',
      '***********************'
    ])
  })

  test('due date', () => {
    const invoice = { orders: [] }

    printOwing(invoice)

    expect(capturedLog[5]).toEqual('due: ' + new Date(2019, 0, 31).toLocaleDateString())
  })
})
