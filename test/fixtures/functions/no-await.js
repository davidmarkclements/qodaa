'use strict'

const test = async function () {
  return 'pass'
}

test().then(console.log).catch(() => console.log('fail'))
