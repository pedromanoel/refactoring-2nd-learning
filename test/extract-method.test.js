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

  test('customer name', () => {
    const invoice = { customer: 'A Customer', orders: [] }

    printOwing(invoice)

    expect(capturedLog[3]).toEqual('name: A Customer')
  })

  test('invoice amount', () => {
    const invoice = {
      orders: [ { amount: 10 }, { amount: 15 } ]
    }

    printOwing(invoice)

    expect(capturedLog[4]).toEqual('amount: 25')
  })

  test('due date', () => {
    const invoice = { orders: [] }

    printOwing(invoice)

    expect(capturedLog[5]).toEqual('due: ' + new Date(2019, 0, 31).toLocaleDateString())
  })
})
