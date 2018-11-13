# webpack 多页

http://192.168.0.101:8081/about.html

http://192.168.0.101:8081/contact.html

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


// 方法2
plugins: [
   new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify("production")
    }
  })
]
```