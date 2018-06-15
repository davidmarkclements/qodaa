'use strict'

if (process.versions.node.substr(0, 2) !== '6.') return

const Module = require('module')
const falafel = require('falafel')

const compile = Module.prototype._compile

global[Symbol.for('qodaa.async')] = (fn) => {
  return (...args) => {
    const iter = fn(...args)
    return new Promise((resolve, reject) => {
      pop()
      function pop (item) {
        try {
          const { value, done } = iter.next(item)
          if (done === true) {
            resolve(value)
            return
          }
          if (value == null || typeof value.then !== 'function') {
            pop(value)
            return
          }
          value
            .then(pop)
            .catch(reject)
        } catch (e) {
          reject(e)
        }
      }
    })
  }
}

Module.prototype._compile = function (content, filename) {
  if (/node_modules/.test(filename)) return compile.call(this, content, filename)
  if (content[0] === '#') {
    const [, ...lines] = content.split('\n')
    content = lines.join('\n')
  }
  const transpiled = falafel(content, {
    ecmaVersion: 10
  }, (node) => {
    const { type, async } = node
    if (type === 'AwaitExpression') {
      if (node.parent.type === 'ExpressionStatement') {
        node.update(node.source().replace('await', 'yield'))     
      } else { 
        node.update(
          '(' + node.source().replace('await', 'yield') + ')'
        )
      }
    }
    if (async === true) {
      const src = type === 'ArrowFunctionExpression'
        ? arrow(node)
        : node.source()
          .replace('async', '')
          .replace('function', 'function *')
      if (type === 'FunctionDeclaration') {
        node.update(
          `function ${node.id.name} (...args) { return global[Symbol.for('qodaa.async')](` + src + ')(...args) }'
        )
      } else {
        node.update(
          `global[Symbol.for('qodaa.async')](` + src + ')'
        )
      }
    }
  })
  return compile.call(this, transpiled, filename)
}

function arrow (node) {
  return node.expression === true ? node.source()
    .replace('async', 'function * ')
    .replace('=>', '{ return ') + '}' : node.source()
    .replace('async', 'function * ')
    .replace('=>', '')
}
