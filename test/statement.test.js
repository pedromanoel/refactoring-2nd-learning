/* global test, expect */

const statement = require('../src/statement')
const plays = require('./plays.json')
const invoices = require('./invoices.json')

test('statement returns bill', () => {
  const result = statement(invoices[0], plays)
  expect(result).toBe([
    'Statement for BigCo',
    '  Hamlet: $650.00 (55 seats)',
    '  As You Like It: $580.00 (35 seats)',
    '  Othello: $500.00 (40 seats)',
    'Amount owed is $1,730.00',
    'You earned 47 credits',
    ''].join('\n'))
})

test('tragedy costs 400 USD', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'tragedy', audience: 0 })
  const plays = givenPlays('tragedy')
  expect(statement(invoice, plays)).toMatch('Tragedy: $400.00')
})

test('tragedy costs an extra 10 USD for each seat past 30', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'tragedy', audience: 35 })
  const plays = givenPlays('tragedy')
  expect(statement(invoice, plays)).toMatch('Tragedy: $450.00')
})

test('comedy costs 300 USD', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'comedy', audience: 0 })
  const plays = givenPlays('comedy')
  expect(statement(invoice, plays)).toMatch('Comedy: $300.00')
})

test('comedy costs 3 USD for each seat', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'comedy', audience: 1 })
  const plays = givenPlays('comedy')
  expect(statement(invoice, plays)).toMatch('Comedy: $303.00')
})

test('comedy costs an extra 100 USD plus 5 USD for each seat past 20', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'comedy', audience: 22 })
  const plays = givenPlays('comedy')

  const baseCost = 300
  const baseCostPerSeat = 22 * 3
  const extraCost = 100
  const extraCostPerSeat = 2 * 5
  const totalCost = baseCost + baseCostPerSeat + extraCost + extraCostPerSeat

  expect(statement(invoice, plays)).toMatch(`Comedy: $${totalCost}.00`)
})

test('tragedy earns one volume credit for each seat past 30', () => {
  const invoice = givenInvoiceWithPerformances(
    { playID: 'tragedy', audience: 40 }
  )
  const plays = givenPlays('tragedy')

  expect(statement(invoice, plays)).toMatch('10 credits')
})

test('comedy earns one volume credit for every 5 seats', () => {
  const invoice = givenInvoiceWithPerformances(
    { playID: 'comedy', audience: 16 }
  )
  const plays = givenPlays('comedy')

  expect(statement(invoice, plays)).toMatch('3 credits')
})

function givenInvoiceWithPerformances (...performances) {
  return {
    customer: 'BigCo',
    performances: performances
  }
}

function givenPlays (...playNames) {
  const toPlay = playName => ({
    type: playName.toLowerCase(),
    name: playName[0].toUpperCase() + playName.slice(1).toLowerCase()
  })

  return playNames
    .map(toPlay)
    .reduce((plays, play) => {
      plays[play.type] = play
      return plays
    }, {})
}
