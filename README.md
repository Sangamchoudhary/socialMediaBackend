# socialMediaBackend
An assingnment by reunion for backend engineer role



# To run the app in development mode
step1 : npm install
step2 : npm run dev

$ To run app in testing mode
step1 : npm test
step2 : check command pannel for all verified test case with chai.js and mocha

Dummy email and password 
1. email - admin1@admin.com  ||  password - admin1
2. email - admin2@admin.com  ||  password - admin2

EIther make calls on 
development mode - http://localhost:3000
or one can make on hosted backed server
render - https://socialmediabackendassignment.onrender.com/


# Authentication API (for login - it will return JWT_Token)
- http://localhost:3000/api/authenticate/login

# get user details API (It will return the logged in user details)
- http://localhost:3000/api/user

# create a post 
- http://localhost:3000/api/posts

# delete a post
- http://localhost:3000/api/posts/63c8510546f3b83f2f1893a4

# get sinle post
- http://localhost:3000/api/posts/63c854b0d1015fcf8becc413

# like a post
- http://localhost:3000/api/like/63c85352579b0dfcb9c93848

# unlie a post
- http://localhost:3000/api/unlike/63c8510546f3b83f2f1893a4

# comment on a post
http://localhost:3000/api/comment/63c85708a7e534556873e33e

# get all post
- http://localhost:3000/api/all_posts

# follow a user
- http://localhost:3000/api/follow/63c69a4a8fddb5be77af3928

# unfollow a user
- http://localhost:3000/api/unfollow/63c69a4a8fddb5be77af3928
