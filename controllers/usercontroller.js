const userdetails = require('../models/userdetails');

exports.getuserdetails = async (req, res) => {
  try {
    const sessionUser = req.session.user;
    return res.send(sessionUser);
  } catch (err) {
    return res.send(err);
  }
};

exports.get_user_data = async (req, res, next) => {
  const id = req.params.User_id;

  await userdetails.findById(id)
	  .select('_id User_Name Contact_Number Birthdate UserProfile')
	  .exec()
	  .then((doc) => {
      if (doc) {
		  res.status(200).json({
          _id: doc._id,
          User_Name: doc.User_Name,
          Name: doc.Name,
          Contact_Number: doc.Contact_Number,
          Birthdate: doc.Birthdate,
          UserProfile: doc.UserProfile,

		  });
      } else {
		  res
          .status(404)
          .json({ message: 'No valid User found for provided ID' });
      }
	  })
	  .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
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

exports.Update_User_data = async (req, res, next) => {
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

exports.delete_user = async (req, res, next) => {
  await userdetails.deleteOne({ _id: req.params.User_id })
	  .exec()
	  .then((result) => {
      res.status(200).json({
		  message: 'User deleted',

      });
	  })
	  .catch((err) => {
      res.status(500).json({
		  error: err,
      });
	  });
};
