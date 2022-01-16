const Userdetails = require('../models/userdetails');

exports.getUserdetails = async (req, res) => {
  const sessionUser = req.session.user;
  console.log(sessionUser);
  await Userdetails.find({ user_name: sessionUser }).select('_id name user_name contact_number birthdate userProfile').exec()
    .then((docs) => {
      res.status(200).json({
        User_Details: docs.map((doc) => ({
          _id: doc._id,
          User_id: doc.user_id,
          User_Name: doc.user_name,
          Name: doc.name,
          Contact_Number: doc.contact_number,
          Birthdate: doc.birthdate,
          UserProfile: doc.userProfile,
        })),
      });
    })
    .catch((err) => {
      res.status(500).json({

        error: err,
      });
    });
};

exports.getUserdetailsById = async (req, res) => {
  const id = req.params.user_id;
  console.log(id);
  const result = await Userdetails.findById(id).select('_id name user_name contact_number birthdate userProfile').exec();
  return res.status(200).json({
    Is_success: true,
    data: result,
    message: 'Success',
    status_code: 200,
  });
};

exports.get_all_users = async (req, res) => {
  let { pageNumber, pageSize } = req.query;
  if (!pageNumber) { pageNumber = 2; }
  if (!pageSize) { pageSize = 10; }
  await Userdetails.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ LastModifiedDate: -1 })
    .then((docs) => {
      res.status(200).json({
        posts_count: docs.length,
        All_Posts: docs.map((doc) => ({
          _id: doc._id,
          User_Name: doc.user_name,
          Name: doc.name,
          Contact_Number: doc.contact_number,
          Birthdate: doc.birthdate,
          UserProfile: doc.userProfile,

        })),
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.Update_User_data = async (req, res) => {
  encryptedPassword = await bcrypt.hash(Password, 10);
  const id = req.params.user_id;
  const {
    name, user_name, contact_number, birthdate, password,
  } = req.body;
  const UserProfile = req.file.path;
  await Userdetails.update(
    { _id: id },
    {
      $set: {
        name, user_name, contact_number, birthdate, UserProfile,
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
          User_Name: doc.user_name,
          Name: doc.name,
          Contact_Number: doc.contact_number,
          Birthdate: doc.birthdate,
          UserProfile: doc.userProfile,
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
  await Userdetails.deleteOne({ _id: req.params.user_id })
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
