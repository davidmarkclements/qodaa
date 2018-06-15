'use strict'
const p = async () => 'p'
const s = async () => { return 'ss' }

const test = async function () {
  return await p() + await a() + await s()
}

test().then(console.log).catch(() => console.log('fail'))

function a () { return 'a' }