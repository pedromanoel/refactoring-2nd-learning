/* global describe, beforeEach, afterEach, test, expect */

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

  test('', () => {
    console.log('Hello')

    expect(capturedLog).toContain('Hello')
  })
})
