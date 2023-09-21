# news_portal_api

This is project is backend api part of News Portal. In this application I have try to implement the backend API's for news portal. I have used "Newsdata.io" Api endpoints for getting latest news articles.

Here is link for Newsdata.io website.

Link : https://newsdata.io/


There are following steps to setup to Local Enviorment : 

1. Clone the repository.
2. Open with code editor and open terminal.
3. Run "npm install" command.
4. In the .env file enter credentials like Database Url, secret key and newsdata secret api key.
5. Run "npm start" command.
6. As their is no admin dashboard in this project. So after starting server you need to add categories manually. For this their is a data.js file located in project in which all categories are mentioned. So you need to simply run a Route to add all categories to database. Here is Api Route:-
    http://localhost:PORT/api/v1/category/add

After running above route all categories will be added to database. Above step is need to run only first time when you setup the project in local enviorment.


There are following api endpoints in the application :-

BASE_URL = "http://localhost:PORT/api/v1/"

User Registeration ##

Route : "BASE_URL/user/register"
method : "POST" 

User Login ##

Route : "BASE_URL/user/login"
method : "POST" 

User Profile ##

Route : "BASE_URL/user/profile"
method : "GET","Authorized"

Save User Interest ##

Route : "BASE_URL/user/save-interest"
method : "POST","Authorize"

Remove User Interest ##

Route : "BASE_URL/user/remove-interest"
method : "POST","Authorize"


Save Article ##

Route : "BASE_URL/user/save-article"
method : "POST","Authorize"


Remove Article ##

Route : "BASE_URL/user/remove-interest"
method : "POST","Authorize"


Adding All Categories from data file to Database ##

Route : "BASE_URL/category/add"
method : "POST"

Getting all available categories from Database ##

Route : "BASE_URL/category/all"
method : "GET"

Suggested Articles based on saved preferences ##

Route : "BASE_URL/articles/suggested"
method : "GET"

Articles based on category ##

Route : "BASE_URL/articles/category/{category_name}"
method : "GET"

Getting top news headlines ##

Route : "BASE_URL/articles/headlines"
method : "GET"

Search the news articles ##

Route : "BASE_URL/articles/search?keyword={keyword}"
method : "GET"


Note :- Due to Limitation of newsdata.io Api it doesn't fetch the article based on their unique id it always returns a array of news articles. So I have stored the article to database when a authorize user save article for future reading. 