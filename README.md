Social Media Node

Prerequisites :

1. Node.js,
2. MongoDB,
3. Postman

To start the project:

1. Open the project in VS Code.
2. Then go to the terminal and execute 'npm i'.
3. Then execute 'npm run dev' or 'npm start'.

Postman Setup:

1. You must have received the POSTMAN collection JSON file while cloning the project. (Root Folder "social-media-app-api.json").
2. Go to POSTMAN and Select any workspace.
3. Then click on the import button to import the POSTMAN collection you got from the project folder.
4. Create a new environment in POSTMAN from 'Environment quick look' button and configure this two variables.
   i - baseURL :- http://localhost:5000
   ii - token :- token (You will get token after successful login)
   PS: Make sure you save variables after changing in the postman environment.

For environment variable on node project:

1. Create .env file in your project root folder and paste the content given below.

```
   PORT=5000
   DATABASE_URL="mongodb://127.0.0.1:27017/postgram"
   NODE_MAILER_USER="{Ask Dhruv/Viral}"
   NODE_MAILER_USER_PASS="{Ask Dhruv/Viral}"
```

Socket Setup:

1. For Connecting socket, pass auth token in headers.
2. For listening to new post event, add event listener with event "new-post".
