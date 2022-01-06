const { ObjectId } = require('mongodb');
// const fs = require('fs');
const Postdetails = require('../models/postdetails');
const Comment = require('../models/comments');
require('dotenv/config');

exports.get_all_posts_of_all_users = async (req, res) => {
  let { pageNumber, pageSize } = req.query;
  if (!pageNumber) { pageNumber = 2; }
  if (!pageSize) { pageSize = 2; }

  await Postdetails.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ LastModifiedDate: -1 })
    .then((docs) => {
      res.status(200).json({
        posts_count: docs.length,
        All_Posts: docs.map((doc) => ({
          Id: doc._id,
          User_id: doc.User_id,
          User_Name: doc.User_Name,
          Heading: doc.Heading,
          Description: doc.Description,
          LastModifiedDate: doc.LastModifiedDate,
          ImageOfPost: doc.ImageOfPost,
        })),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_user_posts = async (req, res) => {
  const id = req.params.User_id;
  const newid = new ObjectId(id);
  let { pageNumber, pageSize } = req.query;
  if (!pageNumber) { pageNumber = 2; }
  if (!pageSize) { pageSize = 10; }

  await Postdetails.find({ User_id: newid })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ LastModifiedDate: -1 })
    .select('_id User_Name Heading Description LastModifiedDate ImageOfPost')
    .exec()
    .then((docs) => {
      if (docs) {
        // console.log(doc);
        res.status(200).json({
          User_Posts: docs.map((doc) => ({
            Id: doc._id,
            User_id: doc.User_id,
            User_Name: doc.User_Name,
            Heading: doc.Heading,
            Description: doc.Description,
            LastModifiedDate: doc.LastModifiedDate,
            ImageOfPost: doc.ImageOfPost,
          })),

        });
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.create_user_post = (req, res) => {
  const post = new Postdetails({
    User_id: req.params.User_id,
    User_Name: req.body.User_Name,
    Heading: req.body.Heading,
    Description: req.body.Description,
    ImageOfPost: req.file.path,
  });

  post.save()
    .then((result) => {
      res.status(201).json({
        message: 'Post Added successfully',
        createdPost: {
          User_Name: result.User_Name,
          Heading: result.Heading,
          Description: result.Description,
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

exports.Update_User_post = async (req, res) => {
  const id = req.params.Post_id;
  const timeInMss = Date.now();
  const newpostdata = {
    Heading: req.body.Heading,
    Description: req.body.Description,
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
          LastModifiedDate: result.LastModifiedDate,
          Heading: result.Heading,
          Description: result.Description,
          ImageOfPost: result.ImageOfPost,
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

exports.delete_user_post = async (req, res) => {
// Postdetails.remove({ _id: req.params._id })

  await Postdetails.deleteOne({ _id: req.params.Post_id })
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

exports.delete_all_user_post = async (req, res) => {
  const id = req.params.User_id;
  const newid = new ObjectId(id);
  // console.log(new_id)
  await Postdetails.deleteMany({ User_id: newid })
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
  const id = req.params.Post_id;
  if (islike === 'Like') {
    await Postdetails.findOneAndUpdate(
      { _id: id },
      { $inc: { Like_count: 1 } },
    )
      .exec()
      .then((result) => {
        res.status(200).json({
          message: 'Like updated',
          UpdatedPost: {
            Liked: result.Is_Like,

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
    await Postdetails.findOneAndUpdate(
      { _id: id },
      { $inc: { Like_count: -1 } },
    )
      .exec()
      .then((result) => {
        res.status(200).json({
          message: 'DisLike updated',
          UpdatedPost: {
            Liked: result.Is_Like,

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
    User_id: req.params.User_id,
    Post_id: req.params.Post_id,
    Comment: req.body.Comment,
  });

  commentdata.save()
    .then((result) => {
      res.status(201).json({
        message: 'Comment Added successfully',
        AddedComment: {
          User_id: result.User_id,
          Post_id: result.Post_id,
          Comment: result.Comment,
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
