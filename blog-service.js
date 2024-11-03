const fs = require("fs");
const path = require('path');
let categories = [];
let posts = [];

function initialize() {

    const promise1 = new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, './data/posts.json'), 'utf8', (err, data) => {
            if (err) {
                return reject('unable to read file posts')
            }
            try {
                posts = JSON.parse(data);
            } catch (parseErr) {
                return reject('unable to parse posts');
            }
            resolve()
        })
    })

    const promise2 = new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, './data/categories.json'), 'utf8', (err, data) => {
            if (err) {
                return reject('unable to read file categories')
            }
            try {
                categories = JSON.parse(data);
            } catch (parseErr) {    
                return reject('unable to parse categories');
            }
            resolve()
        })
    })

    return new Promise((resolve, reject) => {
        Promise.all([promise1, promise2]).then(() => {
            resolve()
        }).catch(err => {
            reject(err)
        })
    })

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
        if (publishedPosts.length == 0) {
            return reject('no results returned');
        }
        resolve(publishedPosts);
    }); 
}
function getPostsByCategory(Category){
    return new Promise((resolve, reject) => {
        const postsInCategory = posts.filter(post => post.category == Category);
        if (postsInCategory.length == 0) {
            return reject('no results returned');
        }
        resolve(postsInCategory);
    }); 
}
function getPostsByMinDate(minDateStr){
    return new Promise((resolve, reject) => {
        const postsAfterDate = posts.filter(post => new Date(post.postDate) >= new Date(minDateStr));
        if (postsAfterDate.length == 0) {
            return reject('no results returned');
        }
        resolve(postsAfterDate);
    });
}
function getPostById(id){
    return new Promise((resolve, reject) => {
        const searchedPost = posts.filter(post => post.id >= id);
        if (searchedPost.length == 0) {
            return reject('no result returned');
        }
        resolve(searchedPost);
    });
}
function getCategories(){
    return new Promise((resolve, reject) => {
        if (categories.length == 0) {
        reject('unable to read file');
        }
        resolve(categories);
    });
}
function addPost(postData){
    return new Promise((resolve, reject) => {
        postData.published = postData.published ? true : false;
        postData.id = posts.length + 1;
        posts.push(postData);
        resolve(postData);
    });
}
module.exports = {
    initialize, 
    getAllPosts, 
    getPublishedPosts, 
    getCategories,
    addPost,
    getPostsByCategory,
    getPostsByMinDate,
    getPostById
}