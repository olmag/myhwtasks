## Overview
Your task will be to implement app for managing user data. 
(you can find folder `expected-results` to see how view will look like and what you intended to do)

☝️ All have to be written with plain js !!!(**no extra packages etc.**)

index.html is present and styles as well your task is to write script.

NOTE: **In case of any issue DO NOT hasitate contact to me**

## Prerequirments
1. Install dependencies: `npm i`
2. To start use command: `npm start`
3. Go to browser and open `http://localhost:8081`

## Requirments for app
List of needed features to implement:
1. Showing list of all users.
2. Add ability to create new user via modal (modal is implemented just you have to find way to show/hide it)
3. Add ability to modify user (the same modal as for creating)
4. Removing user
5. In `create/edit modal` list of countries get from data source (could be server or your data store implementation read about it below)

To work with data you have two alternative ways: 
1. (Preferable on this stage )As we didn't work with API before you can import data from file(`homework/resources/data.js`) and work from with that data. 
For this option pls try to manage data with that you have implemented on previous week, class for managing store. 
It will allow you it understands real use case for that. 
2. Get all data from server by making API requests. (We will do it like next iteration)

NOTE: **AS task is reletively time comsuming you can not implemnet all fatures(but preferable to implement all of them)**

NOTE: **no need to rewrite styles, improve view or any other cases, but if you have time and passion you can :)** 

### Next iteration (task 2)
Now it's time for changing/improving our app 😎
Your task is 
1. Instead of editing user on modal you have to implement separate page where your users will be able to edit data for each user. 
    - How page will look like ? It's up to you.
    - You have to keep the same fields like in modal
2. Your new page have to has button to navigate user back. 
3. In case of closing tab on editing page user has to be able restor work after entering app again. 
    - TIP: you have to store data permanently and recover from it on next time user resore session only in case CHANGE WERE NOT SAVED (like in draft mode˚)

## API description (in case you use server)

**Get list of users:** _GET /user_
**Get single user:** _GET /user?id=user-id_
**Get list of countries:** _GET /countries_
**Update single user:** _PUT /user - body the same as for POST_(!!! important to provide id in body)
**Create new user:** _POST /user_
`Body

fullName {String},

birthday: {String},

profession: {String},

email: {String},

address: {String},

country: {String},

shortInfo: {String},

fullInfo: {String}
`
**Delete user**: _DELETE /user?id=user-id_

## Development flow
All stays the same as in Readme.md file.
1. Create new branch from main branch.
2. Create feature branch from the **your** main branch
3. Once finished development create PR.

HAPPY CODING 😎🔥👨‍💻


