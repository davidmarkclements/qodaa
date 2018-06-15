'use strict'
const p = async () => 'p'
const a = async () => 'a'
const s = async () => 'ss'

const test = async () => {
  return await p() + await a() + await s()
}

test().then(console.log).catch(() => console.log('fail'))
