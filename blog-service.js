const fs = require("fs");
const path = require('path');
let categories = [];
let posts = [];

function initialize() {
    return new Promise((resolve, reject) => {

        fs.readFile(path.join(__dirname, '/data/posts.json'), 'utf8', (err, data) => {
            if (err) {
                return reject('unable to read file posts')
            }
            try {
                posts = JSON.parse(data);
            } catch (parseErr) {
                return reject('unable to parse posts');
            }
            fs.readFile(path.join(__dirname, '/data/categories.json'), 'utf8', (err, data) => {
                if (err) {
                    return reject('unable to read file categories')
                }
                try {
                    categories = JSON.parse(data);
                } catch (parseErr) {
                    return reject('unable to parse categories');
                }
                resolve();
            });
        });
    });
}
function getAllPosts(){
    return new Promise((resolve, reject) => {
        if (posts.length == 0) {
            return reject('no results returned');
        }
        resolve(posts);
    }); 
}
function getPublishedPosts(){
    return new Promise((resolve, reject) => {
        const publishedPosts = posts.filter(post => post.published);
        if (posts.length == 0) {
            return reject('no results returned');
        }
        resolve(publishedPosts);
    }); 
}
function getCategories(){
    return new Promise((resolve, reject) => {
        if (posts.length == 0) {
        reject('unable to read file');
        }
        resolve(categories);
    });
}

module.exports = {
    initialize, 
    getAllPosts, 
    getPublishedPosts, 
    getCategories
}