const chai  = require('chai')
const appModulePath  = require('app-module-path')
const path  = require('path')

// Basically makes us able to "const stuff  = require('some/source/folder')"
appModulePath.addPath(path.join(__dirname, './../../server'))
appModulePath.addPath(path.join(__dirname, '/..'))
chai.should()
global.expect = chai.expect
global.assert = chai.assert
