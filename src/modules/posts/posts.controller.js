import { Router } from "express";
import { createPostSchema, updatePostSchema} from "./posts.validator.js";
import { validation } from "../../middleware/validation.js";
import { authentication, optionalAuth } from "../../middleware/authentication.js";
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from "./posts.service.js";

const postRouter = Router();
 

postRouter.get("/", optionalAuth, getAllPosts);        
postRouter.get("/:id", optionalAuth, getPostById);    
postRouter.post("/create", authentication,validation(createPostSchema), createPost);      
postRouter.post("/update/:id", authentication, validation(updatePostSchema), updatePost);   
postRouter.delete("/:id", authentication, deletePost);

export default postRouter;
