import { expect, test } from 'vitest'
import { parser } from './src'
import { TokenTypes } from './src/tokenizer'

test('tokenizer', () => {
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

  const ast = {
    type: 'Program',
    body: [
      {
        type: 'CallExpression',
        name: 'add',
        params: [
          {
            type: 'NumberLiteral',
            value: '2',
          },
          {
            type: 'CallExpression',
            name: 'subtract',
            params: [
              {
                type: 'NumberLiteral',
                value: '4',
              },
              {
                type: 'NumberLiteral',
                value: '2',
              },
            ],
          },
        ],
      },
    ],
  }

  expect(parser(tokens)).toEqual(ast)
})
