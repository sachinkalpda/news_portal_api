const User = require("../../../models/User");
const Category = require("../../../models/Category");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Validator } = require("node-input-validator");
const Article = require("../../../models/Articles");

module.exports.register = async function (req, res) {
  try {
    // validating input from user
    let validate = new Validator(req.body, {
      name: "required",
      email: "required",
      password: "required",
    });

    const matched = await validate.check();
    // if validation failed
    if (!matched) {
      return res.status(422).json({
        success: false,
        error: validate.errors,
      });
    }

    // if validation is successfull creating a new user
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });

    if (user) {
      return res.status(201).json({
        success: true,
        message: "User Registered Successfully",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// method for login routes
module.exports.login = async function (req, res) {
  try {
    // checking user exists or not
    const user = await User.findOne({ email: req.body.email });
    // if user not exist or password dosn't matched
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(422).json({
        success: false,
        message: "Invalid Email/Password!",
      });
    } else {
      // on success sending jwt token
      return res.status(200).json({
        success: true,
        message: "Logged In",
        data: {
          token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
            expiresIn: "1d",
          }),
          user: {
            name: user.name,
            email: user.email,
            id: user._id,
          },
        },
      });
    }
  } catch (error) {
    console.log("Error in login", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// method for user profile
module.exports.profile = async function (req, res) {
  try {
    const user = await User.findOne(req.user._id).populate('saved');
    if (user) {
      return res.status(200).json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        saved : user.saved
      });
    }
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong!",
    });
  } catch (error) {
    console.log("Error in Adding Interestes", error);
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

// method for adding category to user's interest
module.exports.addInterest = async function (req, res) {
  try {
    // getting current loggged in user
    const user = await User.findOne(req.user._id);
    if (user) {
      const categoryId = req.body.category;
      // checking selected category by user is valid or not
      const category = await Category.findById(categoryId);
      // if valid
      if (category) {
        // checking wheather selected already saved or not
        if (!user.interests.includes(category._id)) {
          // if not added to user's preference
          user.interests.push(category._id);
          await user.save();
          return res.status(200).json({
            success: true,
            message: "Interest Saved",
            data: {
              token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
                expiresIn: "1d",
              }),
              user: {
                name: user.name,
                email: user.email,
                id: user._id,
              },
            },
          });
        }
        // if already saved to user's preference
        return res.status(422).json({
          success: false,
          message: "Interest Already Exist!",
        });
      }
      // if category invalid
      return res.status(400).json({
        success: false,
        message: "Invalid Interest!",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  } catch (error) {
    console.log("Error in Adding Interestes", error);
    return res.status(500).json({
      success: true,
      message: "Internal Server Error",
    });
  }
};

// method for removing category from user's preferences
module.exports.removeInterest = async function (req, res) {
  try {
    // getting current loggged in user
    const user = await User.findById(req.user._id);
    if (user) {
      // checking selected category by user is valid or not
      const category = await Category.findById(req.body.category);
      // if valid
      if (category) {
        // removing interests
        user.interests.pull(category._id);
        await user.save();

        return res.status(200).json({
          success: true,
          message: "Interest Removed!",
          data: {
            token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
              expiresIn: "1d",
            }),
            user: {
              name: user.name,
              email: user.email,
              id: user._id,
            },
          },
        });
      }
      // if category invalid
      return res.status(400).json({
        success: false,
        message: "Invalid Interest",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong",
    });
  } catch (error) {
    console.log("Error in removing interest", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.saveArticle = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    // getting current logged in user``
    if (user) {
      // finding article
      const article = await Article.findOne({
        article_id: req.body.article_id,
      });
      // if exists then save it to user' saved articles
      if (article) {
        if(!user.saved.includes(article._id)){
          user.saved.push(article._id);
          await user.save();
        }
        // if article already saved 
        return res.status(400).json({
          success: false,
          message: "Article Already Saved!",
        });
        
      } else {
        // craete new article and save it to db
        const newArticle = await Article.create({
          article_id: req.body.article_id,
          title: req.body.title,
          link: req.body.link,
          pubDate: req.body.pubDate,
          image_url: req.body.image_url,
          creator: req.body.creator,
        });
        // if created save it to uses's saved articles
        if (newArticle) {
          newArticle.category.push(req.body.category);
          await newArticle.save();

          user.saved.push(newArticle._id);
          await user.save();
        }
      }
      // returning response
      return res.status(200).json({
        success: true,
        message: "Article Saved",
        data: {
          token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
            expiresIn: "1d",
          }),
          user: {
            name: user.name,
            email: user.email,
            id: user._id,
          },
        },
      });
    }

    return res.status(400).json({
      success: false,
      message: "Somthing Went Wrong",
    });
  } catch (error) {
    console.log("Error in removing interest", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// for removing the saved article from user' saved articles

module.exports.removeArticle = async function (req, res) {
  try {
    const user = await User.findById(req.user.id);
    if(user){
      const article = await Article.findById(req.body.article_id);
      if(article){
        user.saved.pull(article._id);
        await user.save();
        return res.status(200).json({
          success: true,
          message: "Article Removed",
          data: {
            token: jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
              expiresIn: "1d",
            }),
            user: {
              name: user.name,
              email: user.email,
              id: user._id,
            },
          },
        });
      }
      return res.status(400).json({
        success : false,
        message : "Invalid Article"
      })
    }
    return res.status(400).json({
      success : false,
      message : 'Something Went Wrong'
    })
  } catch (error) {
    console.log("Error in removing interest", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
