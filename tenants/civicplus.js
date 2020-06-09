// @flow
'use strict'

const generateClasses = require('../classes')
const { CIVICPLUS } = require('../lib/tenant-configuration')

module.exports = generateClasses(CIVICPLUS)
