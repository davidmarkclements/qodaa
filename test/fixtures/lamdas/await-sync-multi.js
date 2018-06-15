'use strict'

const test = async () => {
  var s = 'p'
  s += await 'a'
  s = s + await 's'
  const c = await 's'
  return await s + c
}

test().then(console.log).catch(() => console.log('fail'))
