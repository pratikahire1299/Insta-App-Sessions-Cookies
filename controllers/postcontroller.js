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
  [posts, count] = await Promise.all([
    Postdetails.find({ user_id: newid }).skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ lastModifiedDate: -1 }),
    Postdetails.countDocuments(),

  ]);

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
    .exec();
  return res.status(200).json({

    Is_success: true,
    data: { newpostdata },
    message: 'Success',
    status_code: 200,

  });
};

exports.deleteUserPost = async (req, res) => {
  const data = await Postdetails.deleteOne({ _id: req.params.post_id })
    .exec();
  return res.status(200).json({

    Is_success: true,
    data: { data },
    message: 'Success',
    status_code: 200,

  });
};

exports.deleteAllUserPost = async (req, res) => {
  const id = req.params.user_id;
  const newid = new ObjectId(id);
  let count = ''; let posts = '';
  // console.log(new_id)
  [posts, count] = await Promise.all([
    Postdetails.deleteMany({ user_id: newid }),
    Postdetails.countDocuments(),
  ]);
  return res.status(200).json({

    Is_success: true,
    data: { Deleted_posts: posts, count },
    message: 'Success',
    status_code: 200,

  });
};

exports.postlike = async (req, res) => {
  const { islike } = req.body;
  const id = req.params.post_id;
  const sessionUser = req.session.user;
  // console.log(sessionUser);
  const idOfUser = await Userdetails.find({ user_name: sessionUser }).select('_id');
  // console.log(idd);
  let data = '';
  if (islike === 'Like') {
    data = { likeBy: idOfUser };
  } else {
    data = { dislikeBy: idOfUser };
  }
  await Postdetails.updateOne(
    { _id: id },
    { $set: data },
    { multi: true },

  );
  const count = await Postdetails.find({ _id: id }).select('likeBy').count();

  return res.status(200).json({

    Is_success: true,
    data: { count },
    message: 'Success',
    status_code: 200,

  });
};

exports.postcomment = (req, res) => {
  const commentdata = new Comment({
    user_id: req.params.user_id,
    post_id: req.params.post_id,
    comment: req.body.comment,
  });

  commentdata.save();
  return res.status(200).json({

    Is_success: true,
    data: { commentdata },
    message: 'Success',
    status_code: 200,

  });
};
