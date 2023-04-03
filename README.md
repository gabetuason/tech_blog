# tech_blog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.
Uses the [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4) and Node.js v16. Also inside is a Package.json for metadata and dependencies, which allow package managers like `npm init` to install. See installation and usage for proper use of the application. This site contains handlebars which are easy to use and reusable webpage templates. Also inside are model files for users, post and comment; associations are defined in index.js (example: Users can have many posts). Alot of the code structure are referenced through various excersizes (from: 14-MVC). This is to ensure a stable and working model view controller that meet many requirements.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

This application does not need to be installed as it is deployed on heroku. CHECK USAGE FOR THE DEPLOYED LINK.


If downloading/installing for testing purposes: Assure that node.js is installed preferably version 16 (stable), found on https://nodejs.org/en/download/. To make sure the application is running correctly, the user needs to install packages. To install these packages, the user should run the following command in the terminal: `npm i inquirer@8.2.4` or `npm i`. When installing, it is important that you are in the correct directory otherwise issues may transpire.

Please also install these packages:
- `npm i connect-session-sequelize`
- `npm i dotenv`
- `npm i express`
- `npm i express-handlebars`
- `npm i express-session`
- `npm i handlebars`
- `npm i mysql2`
- `npm i sequelize`
- `npm i bcrypt`


Also make a .env file for user details, this is sensitive information.
- `DB_NAME = "techblog_db"`
- `DB_USER = "root"`
- `DB_PASSWORD = "Your Password"`


## Usage

Deployed Link: 

If downloaded/installed. Run the following commands in your terminal:
1. mysql -u root -p 
2. Enter your password 
3. source ./db/schema.sql; 
4. quit MySQL then type `node seeds/seed.js`
5. npm start

6. Go to `http://localhost:3001/`


## License

The project is licensed under: MIT License. To see the license permissions for commercial and non-commercial use, check the link https://opensource.org/licenses/MIT

## Contributing

This is an open source, feel free to use. This application was build for learning purposes.
  
## Tests

None
  
## Questions

For any questions about the application, please contact gabetuason24@gmail.com or view the github https://github.com/gabetuason to find me