<a href="https://para-social.onrender.com/">
 <img src="https://aaprojectbucket.s3.us-west-1.amazonaws.com/FullLogo_Transparent_NoBuffer_resized.png" alt="Para-Social Logo" height="60" align="right" />
</a>




# Para-Social 

Simple Chat Room based application that I had made when I was first learning to code. Dead now, but keeping codebase just for the sake of it.

## Technologies Used

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)![Static Badge](https://img.shields.io/badge/WebSockets_by_ws-red?style=for-the-badge)

Click here to learn more about the WebSocket package I used:

https://www.npmjs.com/package/ws

## Index
 - [Features](#features)
 - [Database Schema](#database-schema)
 - [Installing Locally](#installing-locally)

## Features:
  - Create or join a community
  - Create rooms for users to interact together in
  - Send messages and images within those rooms

## Database Schema

![image](https://github.com/dylan-mcdougall/Para-Social/assets/107007986/8f9ebd95-5689-41be-bff0-631157b5ea0b)

## Installing Locally
1. Clone this repository:
`https://github.com/dylan-mcdougall/Para-Social.git`
2. Install dependencies using this command in the root directory: `npm install`
3. Create 2 .env files in the root and the backend directories following the respective .env.example provided.
4. Create the database using the following commands in the backend directory: `npx dotenv sequelize db:migrate` `npx dotenv sequelize db:seed:all`
5. Start the backend server by using this command in the backend directory: `npm start`
6. Start the frontend server by using this command in the frontend directory: `npm start`
7. Enjoy!
