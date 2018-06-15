'use strict'

const test = async () => 'pass'

test().then(console.log).catch(() => console.log('fail'))
