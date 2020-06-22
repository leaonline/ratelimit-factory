/* eslint-env meteor */
Package.describe({
  name: 'leaonline:ratelimit-factory',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Rate-limit methods and publications. Lightweight. Simple.',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:leaonline/ratelimit-factory.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6')
  api.use('ecmascript', 'server')
  api.use('sha','server')
  api.mainModule('ratelimit-factory.js', 'server')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('leaonline:ratelimit-factory')
  api.mainModule('ratelimit-factory-tests.js', 'server')
})
