"use strict";

const Model = require("../model");
const AbstractService = require("./abstract");
const CustomErrors = require("../utils/customErrors");
const CustomError = CustomErrors.CustomError;
const csv = require('csv-parser');
const fs = require('fs');

class PostService extends AbstractService {
    static async createPost(params) {       
        try {
            const body = {
                ...params.body
            };
            const tokenUser = await Model.Token.getByTokenString(params.headers.authorization);
            const post = await Model.Post.create(tokenUser, body);  
        
            return super.success(null, {
                post: post
            });  
        } catch (error) {
            return super.failed(error, "An error occurred while creating post.");
        }
    }

    static async createMultiplePosts(params) {
        try {
            var dataString = params.body.upload;
            var response = new Buffer(dataString, 'base64');
            console.log(response);
            
            fs.writeFile("simpleExcel.xlsx", response, {encoding: 'base64'}, (err) => {
                if (err) throw err;
            
                console.log('File saved!');
            });

            // fs.createReadStream('data.csv')
            // .pipe(csv())
            // .on('data', (row) => {
            //     console.log(row);
            // })
            // .on('end', () => {
            //     console.log('CSV file successfully processed');
            // });

            // if (!params.body.data.posts || params.body.data.posts === undefined) {
            //     throw new CustomError('Post IDs must be array with data!', 409);
            // }
            // const tokenUser = await Model.Token.getByTokenString(params.headers.authorization);
            // const posts= [];
            // for(const item of params.body.data.posts){
            //     const body = {
            //         item
            //     };
            //     const post = await Model.Post.create(tokenUser, body); 
            //     posts.push(post);
            // }
            // return super.success(null, {
            //     posts: posts
            // });
        } catch (error) {
            return super.failed(error, "An error occurred while creating multiple posts.");
        }
    }
    static async getPosts(params) {
        try {
            const tokenUser = await Model.Token.getByTokenString(params.headers.authorization);
            const currentUser = await Model.User.getById(tokenUser.created_user_id);
            const posts = await Model.Post.getAllPost(currentUser, params.query);
    
            return super.success(null, {
                posts: posts
            });
        } catch (error) {
            return super.failed(error, "An error occoured in getting posts.");
        }
    }

    static async getPost(data) {
        try {
            const tokenUser = await Model.Token.getByTokenString(data.headers.authorization);
            const post = await Model.Post.getById(tokenUser, data.params.id);

            if(!post) {
                throw new CustomError("Post not found!", 404);
            }
            
            return super.success(null, {
                post: post
            });
        } catch (error) {
            return super.failed(error, "An error occurred while retrieving the post by id.");
        }
    }

    static async getPostByTitle(data) {
        try {                        
            const tokenUser = await Model.Token.getByTokenString(data.headers.authorization);
            const post = await Model.Post.getByTitle(tokenUser, data.params.title);
            
            if(!post) {
                throw new CustomError("Post not found!", 404);
            }
            
            return super.success(null, {
                post: post
            });
        } catch (error) {
            return super.failed(error, "An error occurred while retrieving the post by id.");
        }
    } 

    static async getPost(data) {
        try {
            const tokenUser = await Model.Token.getByTokenString(data.headers.authorization);
            const post = await Model.Post.getById(tokenUser, data.params.id);

            if(!post) {
                throw new CustomError("Post not found!", 404);
            }
            
            return super.success(null, {
                post: post
            });
        } catch (error) {
            return super.failed(error, "An error occurred while retrieving the post by id.");
        }
    }

    static async updatedPost(data) {
        try {
          const tokenUser = await Model.Token.getByTokenString(data.headers.authorization);
          const post = await Model.Post.getById(tokenUser, data.params.id);

          if (!post) {
            throw new CustomError('Cannot get access to update for this post.', 409);
          }

          const updatedPost = await Model.Post.update(tokenUser, data.body, data.params.id);
  
          return super.success(null, {
            post : updatedPost
          }); 
        } catch (error) {
          return super.failed(error, "An error while updating the post.");
        }
    }

    static async delete(data) {
        try {
          const tokenUser = await Model.Token.getByTokenString(data.headers.authorization);
          const post = await Model.Post.getById(tokenUser, data.params.id);
  
          if(post === undefined || post === null){
            return super.failed( null, { message:"Post not found!" } );
          }
          await Model.Post.delete(tokenUser, data.params.id);
    
          return super.success(null, {
            post: post
          });
        } catch (error) {
          return super.failed(error, "Error occoured while deleting the post.");
        }
    }
    
}

module.exports = PostService;
