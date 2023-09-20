const Category = require("../../../models/Category");
const api = require("../../../utils/fetchArticles");

const jwt = require("jsonwebtoken");

module.exports.topHeadlines = async function (req, res) {
  try {
    // getting top headlines
    const response = await api.topHeadline();
    return res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      data: response.articles,
    });
  } catch (error) {
    console.log("Error in getting response", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.suggested = async function (req, res) {
  try {
    let interests = "";
    // checking if authorization header is present
    if (req.headers.authorization) {
      // getting token from header
      const token = req.headers.authorization.split(" ")[1];

      // checking token is valid or not
      jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
        // if token is valid 
        if (!err) {
          // getting user's saved interests and converting them to string for passing in api
          for (let id of decoded.interests) {
            let category = await Category.findById(id);
            if (category) {
              interests += `${category.name},`;
            }
          }
        }
      });
    }

    // getting suggested articles from api
    const response = await api.suggested(interests);
    return res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      data: response.articles,
    });
  } catch (error) {
    console.log("Error in getting response", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.getArticleByCategory = async function (req, res) {
  try {
    let categoryName = req.params.category;
    // console.log("category Name ",categoryName);
    // checking category name is valid or not
    const category = await Category.findOne({ name: categoryName });
    // if valid
    if (category) {
      // getting articles from api based on category
      const response = await api.getArticleByCategory(category.name);
      return res.status(response.statusCode).json({
        success: response.success,
        message: response.message,
        data: response.articles,
      });
    }
    // if not valid category
    return res.status(400).json({
      success: true,
      message: "Invalid Category",
    });
  } catch (error) {
    console.log("Error in getting article by category", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.getArticleByTitle = async function (req, res) {
  try {
    let title = req.params.title;
    // searching article by  title
    const response = await api.getArticleByTitle(title);
    return res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      articles: response.articles,
    });
  } catch (error) {
    console.log("Error in getting article by category", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.searchArticle = async function (req, res) {
  try {
    let keyword = req.query.keyword;
    console.log(keyword);
    // search article by keyword 
    const response = await api.getArticleByKeyword(keyword);
    return res.status(response.statusCode).json({
      success: response.success,
      message: response.message,
      articles: response.articles,
    });
  } catch (error) {
    console.log("Error in getting article by keyword", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
