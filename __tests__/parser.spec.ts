import { expect, test } from 'vitest'
import { parser } from '../src'
import { TokenTypes } from '../src/tokenizer'
import { NodeTypes } from '../src/parser'

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
    type: NodeTypes.ROOT,
    body: [
      {
        type: NodeTypes.CALL_EXPRESSION,
        name: 'add',
        params: [
          {
            type: NodeTypes.NUMBER,
            value: '2',
          },
          {
            type: NodeTypes.CALL_EXPRESSION,
            name: 'substract',
            params: [
              {
                type: NodeTypes.NUMBER,
                value: '4',
              },
              {
                type: NodeTypes.NUMBER,
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

test('simple parser', () => {
  const tokens = [
    { type: TokenTypes.PAREN, value: '(' },
    { type: TokenTypes.NAME, value: 'add' },
    { type: TokenTypes.NUMBER, value: '2' },
    { type: TokenTypes.NUMBER, value: '4' },
    { type: TokenTypes.PAREN, value: ')' },
  ]

  const ast = {
    type: NodeTypes.ROOT,
    body: [
      {
        type: NodeTypes.CALL_EXPRESSION,
        name: 'add',
        params: [
          {
            type: NodeTypes.NUMBER,
            value: '2',
          },
          {
            type: NodeTypes.NUMBER,
            value: '4',
          },
        ],
      },
    ],
  }

  expect(parser(tokens)).toEqual(ast)
})

test('two callExpression', () => {
  const tokens = [
    { type: TokenTypes.PAREN, value: '(' },
    { type: TokenTypes.NAME, value: 'add' },
    { type: TokenTypes.NUMBER, value: '2' },
    { type: TokenTypes.NUMBER, value: '4' },
    { type: TokenTypes.PAREN, value: ')' },
    { type: TokenTypes.PAREN, value: '(' },
    { type: TokenTypes.NAME, value: 'add' },
    { type: TokenTypes.NUMBER, value: '3' },
    { type: TokenTypes.NUMBER, value: '5' },
    { type: TokenTypes.PAREN, value: ')' },
  ]

  const ast = {
    type: NodeTypes.ROOT,
    body: [
      {
        type: NodeTypes.CALL_EXPRESSION,
        name: 'add',
        params: [
          {
            type: NodeTypes.NUMBER,
            value: '2',
          },
          {
            type: NodeTypes.NUMBER,
            value: '4',
          },
        ],
      },
      {
        type: NodeTypes.CALL_EXPRESSION,
        name: 'add',
        params: [
          {
            type: NodeTypes.NUMBER,
            value: '3',
          },
          {
            type: NodeTypes.NUMBER,
            value: '5',
          },
        ],
      },
    ],
  }

  expect(parser(tokens)).toEqual(ast)
})

test('number', () => {
  const tokens = [
    {
      type: TokenTypes.NUMBER,
      value: '2',
    },
  ]

  const ast = {
    type: NodeTypes.ROOT,
    body: [
      {
        type: NodeTypes.NUMBER,
        value: '2',
      },
    ],
  }

  expect(parser(tokens)).toEqual(ast)
})
