/* global test, expect */

const createStatementData = require('../src/createStatementData')

test('tragedy costs 400 USD', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'tragedy', audience: 0 })
  const plays = givenPlays('tragedy')
  expect(createStatementData(invoice, plays)).toMatchObject({
    performances: [
      { amount: 40000 }
    ]
  })
})

test('tragedy costs an extra 10 USD for each seat past 30', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'tragedy', audience: 35 })
  const plays = givenPlays('tragedy')
  expect(createStatementData(invoice, plays)).toMatchObject({
    performances: [
      { amount: 45000 }
    ]
  })
})

test('comedy costs 300 USD', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'comedy', audience: 0 })
  const plays = givenPlays('comedy')
  expect(createStatementData(invoice, plays)).toMatchObject({
    performances: [
      { amount: 30000 }
    ]
  })
})

test('comedy costs 3 USD for each seat', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'comedy', audience: 1 })
  const plays = givenPlays('comedy')
  expect(createStatementData(invoice, plays)).toMatchObject({
    performances: [
      { amount: 30300 }
    ]
  })
})

test('comedy costs an extra 100 USD plus 5 USD for each seat past 20', () => {
  const invoice = givenInvoiceWithPerformances({ playID: 'comedy', audience: 22 })
  const plays = givenPlays('comedy')

  const baseCost = 300
  const baseCostPerSeat = 22 * 3
  const extraCost = 100
  const extraCostPerSeat = 2 * 5

  expect(createStatementData(invoice, plays)).toMatchObject({
    performances: [
      { amount: (baseCost + baseCostPerSeat + extraCost + extraCostPerSeat) * 100 }
    ]
  })
})

test('tragedy earns one volume credit for each seat past 30', () => {
  const invoice = givenInvoiceWithPerformances(
    { playID: 'tragedy', audience: 40 }
  )
  const plays = givenPlays('tragedy')

  expect(createStatementData(invoice, plays)).toMatchObject({
    performances: [
      { volumeCredits: 10 }
    ]
  })
})

test('comedy earns one volume credit for every 5 seats', () => {
  const invoice = givenInvoiceWithPerformances(
    { playID: 'comedy', audience: 16 }
  )
  const plays = givenPlays('comedy')

  expect(createStatementData(invoice, plays)).toMatchObject({
    performances: [
      { volumeCredits: 3 }
    ]
  })
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
