require('babel-register')();
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
var exposedProperties = ['window', 'navigator', 'document'];

const { document } = (new JSDOM('')).window;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;