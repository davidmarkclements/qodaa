'use strict'

const test = async function something () { return 'pass' }

test().then(console.log).catch(() => console.log('fail'))
