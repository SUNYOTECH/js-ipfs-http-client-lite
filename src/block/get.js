'use strict'

const { Buffer } = require('buffer')
const configure = require('../lib/configure')
const { ok } = require('../lib/fetch')
const { objectToQuery } = require('../lib/querystring')

module.exports = configure(({ fetch, apiUrl, apiPath, headers }) => {
  return async (cid, options) => {
    options = options || {}

    const qs = objectToQuery({
      arg: cid.toString(),
      ...(options.qs || {})
    })

    const url = `${apiUrl}${apiPath}/block/get${qs}`
    const res = await ok(fetch(url, {
      signal: options.signal,
      headers: options.headers || headers
    }))
    return Buffer.from(await res.arrayBuffer())
  }
})
