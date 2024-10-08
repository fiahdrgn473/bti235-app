const express = require('express');
const app = express();
const path = require('path');
//const blog = require('blog-service.js')

const HTTP_PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });
  
app.get('/categories', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });
  
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });

app.get('/Error404', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'DK Error 404.jpg'))
});

app.get('/*', (req, res) => {
    res.redirect('/Error404');
});

app.listen(HTTP_PORT, () => {
  console.log(`server listening on: ${HTTP_PORT}`);
});
