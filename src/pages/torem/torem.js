require('reset-css');
require('./torem.css');

require('lib-flexible');

var fn = () => {
  console.log('enter');
};
fn();
const getType = (obj) => {
  return Object.prototype.toString.call(obj).slice(-8, -1);
}
const obj = {};
console.log(getType(obj));