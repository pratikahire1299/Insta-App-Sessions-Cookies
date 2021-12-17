

const verifyLogin = (req, res, next) => {
 
  try {
    if(req.session.user){
      return  next();     //If session exists, proceed to page
     } else {
        
        //console.log(req.session.user); 
       return res.status(401).send("Please log in to access page!");
     }

  } catch (err) {
    return res.status(401).send("Some Error Occure: ");
  }
};

module.exports = verifyLogin;
