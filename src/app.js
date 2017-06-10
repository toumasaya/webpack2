const css = require('./app.sass');

let content = document.getElementById('content');
let p = document.createElement('p');

p.innerHTML = `<a href="#">Hello</a>`
content.appendChild(p);


console.log("Hello Webpack 2")