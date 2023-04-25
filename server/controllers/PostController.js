import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Fail create post",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: "unable get posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    ).then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "post not found",
        });
      }

      res.json(doc);
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "unable get posts",
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    PostModel.find({
      user: req.userId,
    }).then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "post not found",
        });
      }

      res.json(doc);
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "unable get posts",
    });
  }
};

export const remove = (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete({
      _id: postId,
    }).then((err) => {
      console.log(err);

      res.json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "unable get posts",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Unable update the post",
    });
  }
};
