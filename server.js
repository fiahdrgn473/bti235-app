/*********************************************************************************
* BTI325 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Mark McCarthy Student ID: 108516220 Date: 2024/10/09
*
* Online (Vercel) Link: https://bti235assignment2.vercel.app/about
*
********************************************************************************/
const express = require('express');
const app = express();
const path = require('path');
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: 'dvzmk0y1j',
  api_key: '521231215784753',
  api_secret: 'n0lcBSGVX0taPb0e8FyNWT1SxOY',
  secure: true
  });
const upload = multer(); 
const blogservice = require(path.join(__dirname, '/blog-service.js'));

const HTTP_PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/posts', (req, res) => {
  const urlParams = new URLSearchParams(location.search);

// https://example.com/path/to/page?color=purple&size=M&size=L

  if(urlParams.has('category')){
    blogservice.getPostsByCategory(urlParams.get('category'))
    .then(data=> res.json(data))
    .catch(err => res.status(404).json({ message: err }));
  }
  else if (urlParams.has('minDate')){
    blogservice.getPostsByMinDate(urlParams.get('minDate'))
    .then(data=> res.json(data))
    .catch(err => res.status(404).json({ message: err }));
  }    
  else {
    blogservice.getAllPosts()
    .then(data=> res.json(data))
    .catch(err => res.status(404).json({ message: err }));
  }
});

app.get('/blog', (req, res) => {
  blogservice.getPublishedPosts()
  .then(data=> res.json(data))
  .catch(err => res.status(404).json({ message: err }));
});

app.get('/categories', (req, res) => {
  blogservice.getCategories()
  .then(data=> res.json(data))
  .catch(err => res.status(404).json({ message: err }));
});
  
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/posts/add', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/addPost.html'));
})

app.post('/posts/add', upload.single("featureImage"), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  app.get('/posts/:value', (req, res) => {
    blogservice.getPostByID(req.params.value)
  });

  async function upload(req) {
    let result = await streamUpload(req);
    console.log(result);
    return result;
  }
  upload(req).then((uploaded)=>{
    req.body.featureImage = uploaded.url;
    blogservice.addPost(req.body);

    res.redirect('/posts');
    });
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