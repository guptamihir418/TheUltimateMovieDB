# COMP2406 Movie DB Project

Author of this project:
**Mihir Gupta** (101172281)

## Project Structure
You can start, install and do other housekeeping stuff from top-level since the `package.json` has all that. But if you are developing please [`cd frontend`](/frontend/README.md) or [`cd backend`](/backend/README.md) into whatever project you are working on. Install projects related deps in those folders.
```
.
├── README.md
├── .vscode
├── backend    <-- API
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   └── tsconfig.json
├── frontend    <-- React App
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   ├── src
│   ├── tailwind.config.js
│   └── tsconfig.json
├── package-lock.json
└── package.json
```

# CHECK IN 3

### #3 (November 13, 2020)

In this check in I have focused on adding some new stuff in the frontend, so that it is easy for anyone using this project to navigate to and from pages. I have also linked my front end with the backend business logic. I have created almost all the endpoints for this project. For this check in also, I have not linked the MongoDB database. More stuff is explained below, I will explain what I have added in my frontend, backend and what else is left for final project submission.

#### Backend

I have created almost all the endpoints. I have imported the navbar in routes file and also added links to pages in navbar component using link from `reach/router`. 

Now after registering, the register page is navigated to the log in page instead of profile page. On Registration now Emails and Passwords are also sent to server so that it can be later used for logging in.

Changed the body parser to express.json in `index.tsx` in backend as it is deprecated but both works more or less same.

Also if a user now tries to go on any page without logging in the user will be redirected to log in page.

Now, when user tries to log in using email and password, I send a request to backend for logging in with email and password, if the information given is correct the server sends 200 and user gets to profile and if 400 the user stays out at login page. 


#### Frontend

I have added much stuff in the frontend. I have designed my backend the way it will keep on prompting user to log in first then use the project, if you don't have account you register your account first then you can log in from the account and use the project. 

My whole frontend is done in react.js, however some of the styling is done with css, and some with bootstrap, even I am using tailwind for many of my pages. I deliberately did this because I wanted to learn three of them, so this was the best way I could learn all of them with implementing it the way I want.

I have added the Navigation Bar, this will make easier for someone who is using this project to navigate to and from pages.

#### New Pages Added in frontend

`Edit Profile` : User can go and edit the role from contributing to regular or vice versa.

`Add User` : You can register a new user here. (Extra stuff)

`Movie View` : This page will be viewed after you search a movie in search box and selecting the category.

`Add Movie` : This page will only let Contributing user to add a movie, if the user's role is regular movie will not be added, it will trow an alert saying "Please change your role to add a movie".

`Users` : You can view the any user from this page (As in Previous check in #2)

#### Stuff to be done in final

I have to manage the follow thing by users, viewing the followers and unfollow the whoever they want, and send the notification to user if one of it's following adds a movie or writes a review. 

Writing a review on movies by contributing users.

Linking the MongoDB to the project. 


## Available Scripts
`npm run [command]`
Available Commands
```
dev         Run dev server that will restart automatically (Starts Frontend and Backend)
build       Create a production builds
clean       Run clean commands (where applicable)
start       Run production version of backend and dev for frontend
lint        Run eslint frontend + backend
```
