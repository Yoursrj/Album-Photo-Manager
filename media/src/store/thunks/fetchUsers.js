//So now again, our goal here is to make a request and fetch this user.To fetch this array of users, we need to make a get request to local host 3005 slash users
//And to be more precise, it needs to be HTTP,So that's the URL that we want to make a request to keep that in your head for just a moment..Okay, So to create a thunk and fetch our data,I just want to give you kind of a list to go down as you create your own thuunks in the future
//So I'm going to call my thunk fetch users Okay, so inside of our store directory, I'm going to make a new folder called thunks And inside of that folder, I'll make a new file called Fetch Users JS
//Step two.We're going to create our thunk.When we create this, we need to give it a base type.I'll show you exactly what the base type is or what it's used for in just a moment.

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//And this is what that step two is talking about.This is where we put in this type thing, this base type.
//So I'm going to put in a string that kind of describes what I'm trying to fetch here or the purpose of the request.
//So in my case, I'm going to put in users/ fetch.You'll notice that it's kind of the reverse of the name right here.
//So let me tell you what this base type is all about and what is actually used for.Remember just a moment ago, in the last couple of diagrams, I showed you these things right here and
//I told you about this async thunk and how it was going to automatically dispatch some actions for us.Yeah, these things are going to have a type of something like pending and a type of
const fetchUsers = createAsyncThunk ('users/fetch',async()=>{
    //This is where we put in this type thing, this base type.So I'm going to put in a string that kind of describes what I'm trying to fetch here or the purpose of the request.
    //So in my case, I'm going to put in users/ fetch.You'll notice that it's kind of the reverse of the name right here.
    //So let me tell you what this base type is all about and what is actually used for.Remember just a moment ago, in the last couple of diagrams, I showed you these things right here and
    //I told you about this async thunk and how it was going to automatically dispatch some actions for us.
    const response = await axios.get('http://localhost:3005/users');
    //And then inside of here is where I'm going to actually write out my request logic.I'm going to make request over to JSON server.I'm going to get back the response.And from this function, I'm going to return the data that I want to use inside of my user slice.
    //I'm going to return the array of users.So to get started to make a request, we're going to import Axios from Axios.I'll make the request with a wait.Axios .get.We need to make a get request to http colon slash slash local host colon 3005 slash users.
    //So when we make this request, we're going to get back a response object and the list of users, the actual data that gets sent back to us is available on the response data property So that is going to be our array of users.

    //dev only!!
    //This is only to be used during development and we're only going to use it during development
    //We want to make sure that we are handling that loading state correctly.I'm going to find the fetch users thunk that's inside of store Fetchusers
   //Then at the bottom of this file really just right after fetch users I'm going to make a little helper function and I'm going to put a comment right above it that says Dev only
   //as I go into production or really as I finish up working on this feature, I would expect to delete this code
    await pause(1000);
    return response.data;
});
//So whenever our application starts up, we could make a request to fetch all the data we would ever need on the client side.
//So we could make a request to JSON server asking for all the users, all the albums and all the photos that have ever been created.
//Now, this is not always the worst thing in the world, because if we make this request and we get back a response, we're not really going to have to make any additional follow up requests.
//We're going to have all the data we ever need to display to the user.But the very obvious downside is that if our server has a lot of data, we might be receiving back thousands or tens or hundreds of thousands of different records.
//So making this initial request where we ask for all the data, maybe not the best idea if our user is on a spotty Internet connection.
//So again, we refer to this as lazy fetching.We are only fetching data as it is actually needed to display it on the screen.


//DEV ONLY!!

//The helper function is going to be called pause, and we're going to use this to add in an arbitrary, tiny little pause after we make our request
//The function is going to receive an argument called duration . I'm going to return a new promise
//I'm going to call that with an aero function that's going to be called with a resolve function And then inside of here I'm going to call settimeout
//I'm going to pass in resolve and duration this function is going to add in a tiny little pause for us
//It's just going to delay handling or returning the response right here . we will be in that loading state just a little bit longer so we can test out all the loading functionality to use this pause function right above the return statement
//I'm going to add in a wait pause 1000 that's going to add in a one second pause as I make the request
const pause = (duration) =>{
    return new Promise((resolve) =>{
     setTimeout(resolve,duration)
    });
};
//In this case, the one user that has the name of myra for me.This right here, this array.
//That is what I want to get access to inside my reducer.That's what I want to use inside the reducer.
//I want to use that to update my state.So I'm going to return that from this function.I'm going to return response data.Step like 3.1 here
//We need to actually export this thunk function.So at the bottom of the file, I'm going to add in an export fetch users with curly braces.
export {fetchUsers};