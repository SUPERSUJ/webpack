# webpack3 多页

http://192.168.0.101:8081/about.html

http://192.168.0.101:8081/contact.html

http://192.168.0.101:8081/testjquery.html

http://192.168.0.101:8081/torem.html

### es6 -> es5
``` javascript 
// 方法1
"uglifyjs-webpack-plugin": "^1.0.0-beta.3"

{
  test: '/\.js$/',
  loader: 'babel',
  exclude: path.resolve(__dirname, 'node_modules'),
  include: path.resolve(__dirname, 'src'),
  query: {
    presets: ['es2015']
  }
},
```