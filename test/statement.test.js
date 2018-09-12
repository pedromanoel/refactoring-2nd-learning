/* global test, expect */

const { statement, htmlStatement } = require('../src/statement')
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

test('htmlStatement returns bill', () => {
  const result = htmlStatement(invoices[0], plays)
  expect(result).toBe([
    '<h1>Statement for BigCo</h1>',
    '<table>',
    `  ${tr('th', 'play', 'seats', 'cost')}`,
    `  ${tr('td', 'Hamlet', '55', '$650.00')}`,
    `  ${tr('td', 'As You Like It', '35', '$580.00')}`,
    `  ${tr('td', 'Othello', '40', '$500.00')}`,
    '</table>',
    '<p>Amount owed is <em>$1,730.00</em></p>',
    '<p>You earned <em>47</em> credits</p>',
    ''].join('\n'))
})

function tr (cellTag, ...cols) {
  return `<tr>${cols.map(col => `<${cellTag}>${col}</${cellTag}>`).join('')}</tr>`
}
