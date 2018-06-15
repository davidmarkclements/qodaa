'use strict'
const { test } = require('tap')
const { execSync } = require('child_process')
const { join, resolve } = require('path')
const root = resolve(__dirname, '..')
const cases = [
  'await-async-func',
  'await-mixed-multi',
  'await-promise-multi',
  'await-promise',
  'await-sync-multi',
  'await-sync',
  'no-await'
]

for (const scenario of cases) {
  test(`${scenario} (lamda)`, ({is, end}) => {
    const result = execSync(`${process.argv[0]} -r ${root} ${join(__dirname, 'fixtures', 'lamdas', scenario)}`)
    is(result.toString().trim(), 'pass')
    end()
  })
}

for (const scenario of cases) {
  test(`${scenario} (function)`, ({is, end}) => {
    const result = execSync(`${process.argv[0]} -r ${root} ${join(__dirname, 'fixtures', 'functions', scenario)}`)
    is(result.toString().trim(), 'pass')
    end()
  })
}
