'use strict'

const test = async () => await 'pass'

test().then(console.log).catch(() => console.log('fail'))
