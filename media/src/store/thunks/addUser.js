//we're going to make a random nameWe're going to send this thing off to JSON server JSON server is going to save a brand new user
//It's going to give this thing an ID automatically and then it's going to send an object back to us in the response that has the name of the user along with the ID that was generated
//we're going to take this object right here the one that comes back in the response and we're going to add it into our list of users inside of users slice
//then see this brand new user up here on the screen next to all the others that we have already created and already loaded up
//To implement this thing, we're going to oce again use a thunk We're going to create a thunk
//It is going to have a type of users/ add whenever we start our request this thunk is going to automatically dispatch an action for us with a type of users add pending
//We're going to add in an extra reducer inside of our user slice When we see an action with this type right here, we will update the is loading pieceof state to true
import { createAsyncThunk } from "@reduxjs/toolkit";
//So here's the same exact idea that we went over before.We're going to create a thunk.
//It is going to have a type of users slash add.So whenever we start our request, this thunk is going to automatically dispatch an action for us with a type of users add pending.
//We're going to add in an extra reducer inside of our user slice.Whenever we see an action with this type right here, we will update the is loading peace of state to true.
//Then when we eventually get the response back, another action is going to be dispatched. This will be user's ad fulfilled and the payload is going to be whatever response we got back from the API.
//So we can take that object right there and we're going to add it into our data array.So we should have both my right in there and Irvin as well. And of course, we're going to also flip is loading back to false as well.
import axios from "axios";
import {faker} from '@faker-js/faker';
//users ka post , get or remove hua hai simple thunk se..albums or pictures ka hua hai rtk query se .Inside of the body of the request.We're going to include some properties we want to assign to this user.
//So in this case, a name of Myra, maybe.So we make that request, we would end up adding in name of Myra.And Json Server is also going to give this record an ID as well.So it might be given an ID automatically of one.
//Then if we ever want to fetch all of our users, we can make a gift request to localhost 3005.Users that would retrieve all these different users.And if we ever want to delete a user, we'll make a delete request.
//And at the very end of the URL, we're going to put a slash and then the ID of the user that we actually want to delete.
//So in this case, users slash one means we're going to find the user with an ID of one.So that's my row right here.And delete that record.

const addUser= createAsyncThunk('users/add' ,async()=>{
    const response = await axios.post('http://localhost:3005/users',{
        name : faker.name.fullName(),
    });
    return response.data;
})

export {addUser};