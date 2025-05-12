---------------understanding package file
{
"name": "nodejs",
"version": "1.0.0",
"main": "app.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "nodemon app.js", //default script npm start
"start-server": "node app.js" //custom script npm run start-server
},
"author": "",
"license": "ISC",
"description": ""
}

----------npm
npm install nodemon --save (for prodduction)
npm install nodemon --save-dev (for development)
