import postModel from "../../DB/models/post.model.js";


export const getAllPosts = async (req, res, next) => {
  try {
    let posts;
    if (req.user) {
      posts = await postModel.find({
        $or: [{ isPublic: true }, { author: req.user._id }],
      }).populate("author", "name");
    } else {
      posts = await postModel.find({ isPublic: true }).populate("author", "name");
    }
    res.json(posts);
  } catch (err) {
    next(err);
  }
};



export const getPostById = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id).populate("author", "name");
    if (!post) throw new Error("post not found", { case: 404 })

    if (!post.isPublic) {
      if (!req.user || post.author._id.toString() !== req.user._id.toString()) {
        throw new Error("unauthorized", { case: 403 })
      }
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};


export const createPost = async (req, res, next) => {
  try {
    const { title, description, imageUrl, isPublic } = req.body;
    const post = await postModel.create({
      title,
      description,
      imageUrl,
      isPublic: isPublic ?? true,
      author: req.user._id,
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, imageUrl ,isPublic } = req.body;
    post.title = title ?? post.title;
    post.description = description ?? post.description;
    post.isPublic = isPublic ?? post.isPublic;
    if (imageUrl !== undefined) {
      post.imageUrl = imageUrl;
    }

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("id is required", { case: 400 })
  }
  try {
    const post = await postModel.findById(id);
    if (!post) throw new Error("post not found", { case: 404 })

    if (post.author.toString() !== req.user._id.toString()) {
      throw new Error("unauthorized", { case: 403 })
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};