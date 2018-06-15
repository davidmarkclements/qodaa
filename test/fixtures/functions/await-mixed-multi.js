'use strict'
const a = new Promise((resolve) => resolve('a'))
const test = async function test () {
  var s = await Promise.resolve('p')
  s += await a
  const p = Promise.resolve('s')
  // check for accidental function call scenario
  process
  await p
  s = s + await p
  return s + await p.then(() => 's')
}

test().then(console.log).catch(() => console.log('fail'))
