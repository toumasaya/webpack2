const css = require('./app.scss');

let content = document.getElementById('content');
let p = document.createElement('p');

p.innerHTML = `<a href="#">Hello</a>`
content.appendChild(p);


console.log("Hello Webpack 2")