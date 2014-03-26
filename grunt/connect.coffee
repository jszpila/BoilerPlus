module.exports =
  dev:
    options:
      hostname: 'localhost'
      port: 2000
      base: 'public/'
      keepalive: true
      middleware: (connect, options) ->
        options.base = [options.base] unless Array.isArray(options.base)
        middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest]

        options.base.forEach (base) ->
          middlewares.push connect.static(base)
          return

        directory = options.directory or options.base[options.base.length - 1]
        middlewares.push connect.directory(directory)
        middlewares

    proxies:[
      {
        context: '/test'
        host: 'localhost'
        port: 2020
      }
    ]