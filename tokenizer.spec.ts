import { expect, test } from 'vitest'
import { tokenizer } from './src/tokenizer'

test('tokenizer', () => {
  const code = '(add 2 (substract 4 2))'
  const tokens = [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'substract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})
