# MERN - Instagram Clone TypeScript

This is a mobile-first responsive social media application that allows users to register, login, reset password, and use various features such as uploading pictures and videos, following other users, commenting and liking on posts, editing profile, and sending real-time messages, etc.

## Features

- Sign up: new users can register accounts by using their full name, username, email, and password.
- Upload pictures and videos: users can upload pictures and videos and add captions to them.
- Follow and Unfollow: users can follow and unfollow other users to see their posts.
- Save on posts: users can save other users' posts.
- Comment on posts or comments : users can comment on other users' posts or comments.
- Like on posts or comments : users can like or unlike on other users' posts or comments.
- Forgot password: users who have forgotten their password can request a password reset link.
- Reset password: users can reset their password using a link sent to their email address.
- Messages: users can send and receive private messages with other users in real-time.
- Notifications: users receive notifications of new posts from their followings.
- ...

## Tech Stack

- MongoDB: a document-oriented NoSQL database
- Express: a web application framework for Node.js
- React: a JavaScript library for building user interfaces
- Node.js: a JavaScript runtime built on Chrome's V8 JavaScript engine
- TypeScript: a statically-typed superset of JavaScript
- JWT: JSON Web Tokens for user authentication
- Socket.io: a library for real-time web applications
- AWS S3: a cloud-based Amazon simple storage service
- ...

## Usage

1. Clone the repository: `git clone https://github.com/timeseven/instagram-clone.git`

2. Open a terminal and navigate to the server directory: `cd server`

3. Install server dependencies: `npm install`

4. Build the project: `npm run build`

5. Start the server: `npm run dev`

6. Open a new terminal and navigate to the client directory: `cd client`

7. Install client dependencies: `npm install`

8. Start the client: `npm start`

## Guide

To use the app, open your web browser and go to http://localhost:3000. You should see the landing page with log in and sign up features. You can sign up for a new account or log in to an existing account.

After logging in, you will be redirected to the home page that shows all posts from yourself or the users you are following. You can click on a post to view it in more detail, like it, comment it and save it.

In the navigation bar, you can click
Home Icon: to redirect to the home page.
Search Icon: to search other users and view their profiles.
Notification Icon: to view your notifications.
Message Icon: to send private messages with other users.
Plus Icon: to create your own post with pictures, videos and captions.
Profile Icon: to view your profile and edit your personal information.
