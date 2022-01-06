const userdetails = require('../models/userdetails');

exports.getuserdetails = async (req, res) => {
  const sessionUser = req.session.user;
  // console.log(sessionUser);
  await userdetails.find({ User_Name: sessionUser }).select('_id Name User_Name Contact_Number Birthdate UserProfile').exec()
    .then((docs) => {
      res.status(200).json({
        User_Details: docs.map((doc) => ({
          _id: doc._id,
          User_id: doc.User_id,
          User_Name: doc.User_Name,
          Name: doc.Name,
          Contact_Number: doc.Contact_Number,
          Birthdate: doc.Birthdate,
          UserProfile: doc.UserProfile,
        })),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_user_data = async (req, res) => {
  const id = req.params.User_id;

  await userdetails.findById(id).select('_id User_Name Name Contact_Number Birthdate UserProfile').exec().then((docs) => {
    res.status(200).json({
      User_Details: docs.map((doc) => ({
        _id: doc._id,
        User_id: doc.User_id,
        User_Name: doc.User_Name,
        Name: doc.Name,
        Contact_Number: doc.Contact_Number,
        Birthdate: doc.Birthdate,
        UserProfile: doc.UserProfile,
      })),
    });
  })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_all_users = async (req, res) => {
  let { pageNumber, pageSize } = req.query;
  if (!pageNumber) { pageNumber = 2; }
  if (!pageSize) { pageSize = 10; }
  await userdetails.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ LastModifiedDate: -1 })
    .then((docs) => {
      res.status(200).json({
        posts_count: docs.length,
        All_Posts: docs.map((doc) => ({
          _id: doc._id,
          User_Name: doc.User_Name,
          Name: doc.Name,
          Contact_Number: doc.Contact_Number,
          Birthdate: doc.Birthdate,
          UserProfile: doc.UserProfile,

        })),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.Update_User_data = async (req, ress) => {
  encryptedPassword = await bcrypt.hash(Password, 10);
  const id = req.params.User_id;
  const {
    Name, User_Name, Contact_Number, Birthdate, Password,
  } = req.body;
  const UserProfile = req.file.path;
  await userdetails.update(
    { _id: id },
    {
      $set: {
        Name, User_Name, Contact_Number, Birthdate, UserProfile,
      },
    },
    { multi: true },
  )
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          message: 'User Details updated',
          _id: doc._id,
          User_Name: doc.User_Name,
          Name: doc.Name,
          Contact_Number: doc.Contact_Number,
          Birthdate: doc.Birthdate,
          UserProfile: doc.UserProfile,
          Password: encryptedPassword,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_user = async (req, res) => {
  await userdetails.deleteOne({ _id: req.params.User_id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'User deleted',
        Resulr: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
