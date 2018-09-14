'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_HOST:'http://test-admin-h5.olquan.cn'//配置测试接口域名//可以获得process.env.API_HOST
})
