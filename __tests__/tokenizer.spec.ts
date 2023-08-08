import { expect, test } from 'vitest'
import { TokenTypes } from '../src/tokenizer'
import { tokenizer } from '../src'

test('tokenizer', () => {
  const code = '(add 2 (substract 4 2))'
  const tokens = [
    { type: TokenTypes.PAREN, value: '(' },
    { type: TokenTypes.NAME, value: 'add' },
    { type: TokenTypes.NUMBER, value: '2' },
    { type: TokenTypes.PAREN, value: '(' },
    { type: TokenTypes.NAME, value: 'substract' },
    { type: TokenTypes.NUMBER, value: '4' },
    { type: TokenTypes.NUMBER, value: '2' },
    { type: TokenTypes.PAREN, value: ')' },
    { type: TokenTypes.PAREN, value: ')' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('left paren', () => {
  const code = '('
  const tokens = [
    { type: TokenTypes.PAREN, value: '(' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('right paren', () => {
  const code = ')'
  const tokens = [
    { type: TokenTypes.PAREN, value: ')' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('add', () => {
  const code = 'add'
  const tokens = [
    { type: TokenTypes.NAME, value: 'add' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
  const code = '22'
  const tokens = [
    { type: TokenTypes.NUMBER, value: '22' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('add 1 2', () => {
  const code = '(add 1 2)'
  const tokens = [
    { type: TokenTypes.PAREN, value: '(' },
    { type: TokenTypes.NAME, value: 'add' },
    { type: TokenTypes.NUMBER, value: '1' },
    { type: TokenTypes.NUMBER, value: '2' },
    { type: TokenTypes.PAREN, value: ')' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})
