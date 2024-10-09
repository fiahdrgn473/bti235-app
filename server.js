const express = require('express');
const app = express();
const path = require('path');
const blogservice = require(path.join(__dirname, '/blog-service.js'));
//const blog = require('blog-service.js')

const HTTP_PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/posts', (req, res) => {
  blogservice.getAllPosts()
  .then(data=> res.json(data))
  .catch(err => res.status(404).json({ message: err }));
});

app.get('/blog', (req, res) => {
  blogservice.getPublishedPosts()
  .then(data=> res.json(data))
  .catch(err => res.status(404).json({ message: err }));
});

app.get('/categories', (req, res) => {
  blogservice.getPublishedPosts()
  .then(data=> res.json(data))
  .catch(err => res.status(404).json({ message: err }));
});
  
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });

app.get('/Error404', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'DK Error 404.jpg'))
});

app.use((req, res, next)  => {
    res.redirect('/Error404');
});

blogservice.initialize().then(() => {
app.listen(HTTP_PORT, () => {
  console.log(`server listening on: ${HTTP_PORT}`);
});
})
.catch(err => {
  console.log({message: err});
  process.exit(1);
});