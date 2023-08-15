import { type Token, TokenTypes } from './tokenizer'

export enum NodeTypes {
  ROOT,
  NUMBER,
  CALL_EXPRESSION,
}

type ChildNode = NumberNode | CallExpressionNode

interface Node {
  type: NodeTypes
}

interface RootNode extends Node {
  body: ChildNode[]
}

interface NumberNode extends Node {
  value: string
}

interface CallExpressionNode extends Node {
  name: string
  params: NumberNode[]
}

function createRootNode(): RootNode {
  return {
    type: NodeTypes.ROOT,
    body: [],
  }
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.NUMBER,
    value,
  }
}

function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CALL_EXPRESSION,
    name,
    params: [],
  }
}

export function parser(tokens: Token[]) {
  let current = 0
  const rootNode = createRootNode()

  function walk() {
    let token = tokens[current]

    if (token.type === TokenTypes.NUMBER) {
      current++
      return createNumberNode(token.value)
    }

    if (token.type === TokenTypes.PAREN && token.value === '(') {
      token = tokens[++current]
      const node = createCallExpressionNode(token.value)

      token = tokens[++current]
      while (!(token.type === TokenTypes.PAREN && token.value === ')')) {
        // @ts-expect-error
        node.params.push(walk())
        token = tokens[current]
      }

      current++
      return node
    }

    throw new Error(`不认识的token: ${token}`)
  }

  while (current < tokens.length)
    rootNode.body.push(walk())

  return rootNode
}
