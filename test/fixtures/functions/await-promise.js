'use strict'

const test = async function () {
  return await Promise.resolve('pass')
}

test().then(console.log).catch(() => console.log('fail'))
