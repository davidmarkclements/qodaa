'use strict'
const a = new Promise((resolve) => resolve('a'))
async function x () {
  var s = await Promise.resolve('p')
  s += await a
  const p = Promise.resolve('s')
  s = s + await p
  return s + await p.then(() => 's')
}
const test = x

test().then(console.log).catch(() => console.log('fail'))
