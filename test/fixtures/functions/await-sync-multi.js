'use strict'

test().then(console.log).catch(() => console.log('fail'))

async function test () {
  var s = 'p'
  s += await 'a'
  s = s + await 's'
  const c = await 's'
  return await s + c
}