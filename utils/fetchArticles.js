const axios = require("axios");

// api key for newsdata.io
const key = process.env.NEWSDATA_API_KEY;
// base url
const BASE_URL = `https://newsdata.io/api/1/news?apikey=${key}&language=en&image=1`;


// method for getting top headlines
module.exports.topHeadline = async function () {
  try {
    
     response = await axios.get(`${BASE_URL}&category=top&size=4`);

    const articles = response.data;

    return {
      statusCode: 200,
      success: true,
      message: `${articles.results.length} Articles Found`,
      articles: articles.results,
    };
  } catch (error) {
    console.log("Error in utils", error);
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
    };
  }

}


// method for getting suggested articles by category
module.exports.suggested = async function (interests) {
  try {
    // console.log(interests);
    let response = {};
    if (interests.length == 0) {
      response = await axios.get(`${BASE_URL}`);
    } else {
      response = await axios.get(`${BASE_URL}&category=${interests}`);
    }

    const articles = response.data;
    // console.log(articles);

    return {
      statusCode: 200,
      success: true,
      message: `${articles.results.length} Articles Found`,
      articles: articles.results,
    };
  } catch (error) {
    console.log("Error in utils", error);
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
    };
  }
};

// method for getting articles filter by category
module.exports.getArticleByCategory = async function (category) {
  try {
    response = await axios.get(`${BASE_URL}&category=${category}`);

    const articles = response.data;
    // console.log(article);

    return {
      statusCode: 200,
      success: true,
      message: ` Articles Found`,
      articles: articles
    };
  } catch (error) {
    console.log("Error in utils", error);
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error",
    };
  }
};

// method for article search by title
module.exports.getArticleByTitle = async function(title){
    try {
        response = await axios.get(`${BASE_URL}&qInTitle=${title}`);
    
        const article = response.data;
        console.log(article);
    
        return {
          statusCode: 200,
          success: true,
          message: ` Articles Found`,
          articles: article,
        };
      } catch (error) {
        console.log("Error in utils", error);
        return {
          statusCode: 500,
          success: false,
          message: "Internal Server Error",
        };
      }
}

// method for searching article by keyword
module.exports.getArticleByKeyword = async function(keyword){
    try {
        response = await axios.get(`${BASE_URL}&q=${keyword}`);
    
        const articles = response.data;
        // console.log(article);
    
        return {
          statusCode: 200,
          success: true,
          message: `${articles.results.length} Articles Found`,
          articles: articles,
        };
      } catch (error) {
        console.log("Error in utils", error);
        return {
          statusCode: 500,
          success: false,
          message: "Internal Server Error",
        };
      }
}
