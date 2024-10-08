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

app.get('/*', (req, res) => {
    res.send('Error 404, page not found');
    res.status(404).sendFile(path.join(__dirname, 'unknown_(2)(Photo)(noise_scale)(Level3)(width_800)(16bit).jpg'))
});

app.listen(HTTP_PORT, () => {
  console.log(`server listening on: ${HTTP_PORT}`);
});
