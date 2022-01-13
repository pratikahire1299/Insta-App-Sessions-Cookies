const { ObjectId } = require('mongodb');
// const fs = require('fs');
const Postdetails = require('../models/postdetails');
const Userdetails = require('../models/userdetails');
const Comment = require('../models/comments');
require('dotenv/config');

exports.getAllPostOfAllUsers = async (req, res) => {
  let { pageNumber, pageSize } = req.query;
  if (!pageNumber) { pageNumber = 2; }
  if (!pageSize) { pageSize = 2; }
  let count = ''; let posts = '';
  [count, posts] = await Promise.all([Postdetails.countDocuments(),
    Postdetails.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ lastModifiedDate: -1 })]);
  return res.status(200).json({
    Is_success: true,
    data: { count, posts },
    message: 'Success',
    status_code: 200,
  });
};

exports.getUserPost = async (req, res) => {
  const id = req.params.user_id;
  const newid = new ObjectId(id);
  let { pageNumber, pageSize } = req.query;
  if (!pageNumber) { pageNumber = 2; }
  if (!pageSize) { pageSize = 2; }
  let count = ''; let posts = '';
  [count, posts] = await Promise.all([Postdetails.countDocuments(),
    Postdetails.find({ User_id: newid })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ lastModifiedDate: -1 })]);
  return res.status(200).json({
    Is_success: true,
    data: { count, posts },
    message: 'Success',
    status_code: 200,
  });
};

exports.createUserPost = (req, res) => {
  const timeInMss = Date.now();
  const post = new Postdetails({
    user_id: req.params.user_id,
    user_name: req.body.user_name,
    heading: req.body.heading,
    description: req.body.description,
    lastModifiedDate: timeInMss,
    imageOfPost: req.file.path,
  });
  console.log(post);
  post.save();
  return res.status(200).json({
    Is_success: true,
    data: { post },
    message: 'Success',
    status_code: 200,
  });
};

exports.updateUserPost = async (req, res) => {
  const id = req.params.post_id;
  const timeInMss = Date.now();
  const newpostdata = {
    Heading: req.body.heading,
    Description: req.body.description,
    LastModifiedDate: timeInMss,
    ImageOfPost: req.file.path,
  };

  await Postdetails.update(
    { _id: id },
    { $set: newpostdata },
    { multi: true },
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Product updated',
        UpdatedPost: {
          LastModifiedDate: result.lastModifiedDate,
          Heading: result.heading,
          Description: result.description,
          ImageOfPost: result.imageOfPost,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteUserPost = async (req, res) => {
// Postdetails.remove({ _id: req.params._id })

  await Postdetails.deleteOne({ _id: req.params.post_id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Post deleted',
        Deleted_Post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteAllUserPost = async (req, res) => {
  const id = req.params.user_id;
  const newid = new ObjectId(id);
  // console.log(new_id)
  await Postdetails.deleteMany({ user_id: newid })
    .exec()
    .then((result) => {
      res.status(200).json({
        posts_count: result.length,
        message: 'All Post deleted',

      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.postlike = async (req, res) => {
  const { islike } = req.body;
  const id = req.params.post_id;
  const sessionUser = req.session.user;
  console.log(sessionUser);
  const idd = await Userdetails.find({ user_name: sessionUser }).select('_id');
  console.log(idd);

  if (islike === 'Like') {
    const data = { likeBy: idd };
    await Postdetails.update(
      { _id: id },
      { $set: data, $inc: { like_count: 1 } },
      { multi: true },
    )
      .exec()
      .then((result) => {
        res.status(200).json({
          message: 'Like updated',
          UpdatedPost: {
            Liked: result.is_Like,

          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    const data = { dislikeBy: idd };
    await Postdetails.update(
      { _id: id },
      { $set: data, $inc: { like_count: -1 } },
      { multi: true },

    )
      .exec()
      .then((result) => {
        res.status(200).json({
          message: 'DisLike updated',
          UpdatedPost: {
            Liked: result.is_Like,

          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
};

exports.postcomment = (req, res) => {
  const commentdata = new Comment({
    user_id: req.params.user_id,
    post_id: req.params.post_id,
    comment: req.body.comment,
  });

  commentdata.save()
    .then((result) => {
      res.status(201).json({
        message: 'Comment Added successfully',
        AddedComment: {
          user_id: result.user_id,
          post_id: result.post_id,
          comment: result.comment,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
