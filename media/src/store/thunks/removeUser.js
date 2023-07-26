//So if Myra has an idea of one, we put in user slash one.If Irvine is an ID of 15, we put in users slash 15.
//So this is a scenario where when we call our thunk, we're going to have to pass an argument to it because we need to tell the thunk exactly what ID of the user is that we need to delete.
//Just keep that in your mind for a little bit because it's something we're going to have to worry about in a little bit.
//Now, as usual, to make this request, we're going to use an asynchronous thunk function.So we're going to create yet another thunk.
//Whenever we start this request, we're going to get an action with a type of users delete pending.So we're going to have to update our state accordingly.
//We're still going to maintain that is loading flag inside of our redux door, even though we're not at all using it anymore.
//To be super clear, remember now our component is keeping track of that loading state.
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk ('users/remove',async(user)=>{
     await axios.delete(`http://localhost:3005/users/${user.id}`);
    //FIX!!
    //return response.data
    //whenever we'd run our thunk, here's remove a user .We return something right here, and whatever we returned shows up as action payload inside of our reducer
    //Whenever we send a delete request off to JSON server the response is going to be an empty object So when we return response data we're returning an empty object
    //And so we don't really see we don't get any information about who is supposed to be deleted
    //And so that's why I mentioned that if you just copy paste this code across to your own personal projects you're going to eventually run into an issue
    //You can't always just return response data because response data might not contain the information that your reducer needs to work correctly
    //So in this case instead of returning response to data, we're going to instead return the user who is deleted
    //So I'm going to return user . Because of that, I no longer need the response at all
    //When we get that fulfilled action dispatched .Now our payload is going to be the ID and the name of whoever was just deleted
    return user;
})

export {removeUser}