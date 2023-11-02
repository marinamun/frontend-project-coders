# Lord of the Coders

![App logo](./src/assets/logo.png)

## [See the App!](https://lord-of-the-coders.netlify.app/)

## Description

This is an app to help coders resolving issues in their code. Different languages can be targeted and everybody can share their solutions.

## User Stories

- **404**: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup**: As an anon I can sign up in the platform so that I can start asking questions and helping coders
- **Login**: As a user I can login to the platform so that I can see the questions and start sharing questions or answers
- **Feed**: As a user I can see all the questions created and filter them by languages
- **Add a question**: As a user I can add a new question and insert a file to it
- **Add answers**: As a user I can answer to a specific question to help another user
- **See my profile**: As a user I can see my profile and the questions I posted
- **Update my profile**: As a user I can update my profile to specify the languages I use, my level and from where I come

## Backlog

- Logout
- Link to user's profile while clicking on the photo
- Make the share button usable
- Display answers of the user on his profile page
- Send message to a specific user through a chatbox
- Search bar on the feed

# Client / Frontend

## React Router Routes (React App)

| Path |   Page   |   Permissions    |   Behavior   |
| :--: | :------: | :--------------: | :----------: |
| `/`  | Homepage | public `<Route>` | Welcome page |

# Server / Backend

## Models

User Model
{
username: {
type: String,
required: [true, "Username is required."],
unique: true,
lowercase: true,
trim: true,
},
email: {
type: String,
required: [true, "Email is required."],
unique: true,
lowercase: true,
trim: true,
},
password: {
type: String,
required: [true, "Password is required."],
},
languages: {
type: [String],
enum: ["JavaScript", "Python", "Java", "C++", "C#"],
},
country: { type: String },
level: { type: [String],
enum: ["Learner", "Junior", "Senior"]
},
photo: {
type: String,
default:
"https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png",
}
}
{ timestamps: true}

Question Model
{
owner: { type: Schema.Types.ObjectId, ref: "User" },
title: { type: String, required: [true, "Title is required."] },
text: { type: String, required: [true, "Text is required."] },
languages: {
type: [String],
enum: ["JavaScript", "Python", "Java", "C++", "C#"],
},
image: {
type: String,
},
answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }]
},
{ timestamps: true}

Answer Model
{
owner: { type: Schema.Types.ObjectId, ref: "User" },
question: {type: Schema.Types.ObjectId, ref: "Question" },
text: { type: String, required: [true, "Text is required."] },

    image: { type: String }

},
{ timestamps: true}

## API Endpoints (backend routes)

| HTTP Method |      URL       |        Request body         | Success status | Error status |                                                           Description                                                           |
| :---------: | :------------: | :-------------------------: | :------------: | :----------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|     GET     |    `/auth`     |        Saved session        |                |              |                                                   Check if user is logged in                                                    |
|    POST     | `/auth/signup` | {username, email, password} |      201       |     400      | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
|    POST     | `/auth/login`  |    {username, password}     |      200       |     400      |       Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session        |
