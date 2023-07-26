import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';
import { removeUser } from '../thunks/removeUser';
//Here, we import the createSlice function from Redux Toolkit, along with the thunks (fetchUsers, addUser, and removeUser) that are used to perform asynchronous operations.

//as you probably guess we're going to store a list of users that is going to change over time as we fetch data as we create new users, and eventually as we allow ourselves to delete a user as wellthe goal of this slice that we're about to create is to manage everything related to these users
//To create our slice at the very top With create slice I'm going to give this a name of users An initial state
//That's going to be an object It's going to have a data property that is  array as you guess this is going to be our list of users and it's going to grow over time as we fetch data, 
//as we create new users and as we delete them, we're going to eventually have a couple of other pieces of state that are tied to the list of users
//So we're going to expand this object over time But right now we'll just leave data right there And then for right now we will add in reducers And we're going to make this an empty object
const usersSlice = createSlice({
   name: 'users',
   initialState: {
      data: [],
      isLoading: false,
      error: null,
   },
   //The createSlice function is used to define a slice of the Redux store named "users." It takes an object as an argument with properties like name (the slice name) and initialState (the initial state of the slice).
   //In this case, the initial state includes data (an empty array to store users), isLoading (a boolean flag to track loading state), and error (to store any error that occurs).


   //So when a user first loads up our application, we need to immediately reach out to our API and fetch some data.
   //So when we start our request, we need to immediately make a state update. We need to set is loading to be true because we just started our request and we want to show a loading message to the user.
   //Then when we get back response.There are two possibilities.Either we get back a response and we get some data or something goes wrong with the request and we get some kind of error.
   //So if everything goes as expected, then we would want to set the is loading property to false and we would want to update our data array with all the different users that we just fetched from the back end API.
   //The other possibility is that something goes wrong.So something goes wrong.We want to change is loading to be false because even though something went wrong, well, we're not loading any data anymore and then we're going to assign to that air property and air object.


   //I'm going to go back over to User Slice.At the top.I'm going to import the thunk we just created.So import fetch users from up one directory.thunks Fetch users.
   //I'm going to find where we define the empty object right here of reducers.We are not going to define any reducers in here.Instead, this slice is only going to be making use of extra reducers.So I'm going to remove reducers, empty object.
   //I'm going to replace it with extra reducers.This will be called with a builder.So, again, a quick reminder on extra reducers.
   //The goal of this thing is to allow us to watch for some additional action types, to watch for actions that are being dispatched that are not inherently tied to the slice.
   //So in this case, we want to watch for three particular action types we want to watch for.The pending one, the fulfilled one and the rejected one.
   //So to Tell Redux Toolkit, we want to watch for those.We are going to call builder ad case three separate times.

   //The extraReducers property allows us to define reducer functions that respond to different action types (fetchUsers.pending, fetchUsers.fulfilled, fetchUsers.rejected, etc.). 
   //These reducers will handle the corresponding actions and update the state accordingly.
   extraReducers(builder) {
      builder.addCase(fetchUsers.pending, (state, action) => {
         state.isLoading = true;
      });
      //we're going to use async thunks to handle fetching the list of users, creating, deleting a user we're going to make use of RTQ to handle albums, photos in this diagram we got our flow of a component
      //a user does something, we're going to dispatch an action goes off to our different reducers We produce state and that state goes back over to our component in this entire flow where do we actually write in some logic to make a network request?
      //you must never make a request from this particular area and that is from inside of a reducer in no scenario ever are we ever going to try to make a request from inside of a reducer function
      //Reducers should always be 100% synchronous so they should always take in some state and actio, make an update to states they are never going to have any logic related to making a request
      //They're never going to have any API calls, no promises, no async await, nothing like that Instead any time we need to make a request we're always going to use one of these two techniques
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
         //So remember this right here.I told you that when we start the request, we want to change is loading to be true.If the request is completed successfully, we want to change is loading into false.
         //And we want to set data to be whatever data we fetch.And then if something went wrong, we want to set is loading to false and we want to set the air piece of state to be that air object.
         //So these are the updates we're going to write in these different reducer functions.Let's take care of the starting the request one first.
         //So in the first one, when we start the request, when it goes into this pending state, all we want to do is set State isLoading.To be true.
         state.isLoading = false;
         //data array k anadr wwo array of objects jayengi action k andar...action k andar response.data aayega
         //so here's what we start the requestWe return response data
         //The async thunk is then going to automatically dispatch this action with the fulfilled type, which means, hey everything went successfully
         //And then here's the critical part Whatever we return from that thunk function, we are returning response data ourselves is going to be assigned to the payload property of this action
         //the payload is going to be the array of users that we just fetch from the API .the payload is going to be  data that we actually fetched that means that back inside of our slice
         //Right here at the Fulfilled Case Action Payload that contains the data that contains whatever we just fetch from the API .
         //It contains the list of users we're going to update our state in some way with that data
         state.data = action.payload;
      });
      //As we r making a request we r seeing state change multiple times during the life cycle of the request first we need to change our state
      //We need to change isloading to be true when we get a response or when we get an error we need to change our state again this really implies that for every request we ever make 
      //we need to be able to dispatch two separate actions there are two possibilities here first possibility is that we start the request and then we finish it in that case we would dispatch at a minimum two different actions one to update our state
      //To set isloading to true And then to handle the fact that we just got our data back and we need to update that data properly
      //The other possibility is that we start the request and we end up with an error we would need to dispatch 1 action to make this update and a second action to make that update the of the point I want to make
      //when we make a request we have to dispatch multiple different actions to update these different pieces of state appropriately
      builder.addCase(fetchUsers.rejected, (state, action) => {
         state.isLoading = false;
         // we want to replace whatever the current data property is with the data that we just fetched we are going to say state data is action payload one last thing here
         //in the case that the request failed, we're going to again set is loading to be false 
         state.error = action.error;
      });
      //In these reducer functions, we update the state based on the action type. For the fetchUsers.pending action, we set isLoading to true to indicate that the request is in progress.
      // For the fetchUsers.fulfilled action, we set isLoading to false and update the data array with the users fetched from the API. 
      //If the fetchUsers.rejected action occurs (when there is an error), we set isLoading to false and store the error in the error property of the state.


      //So three reducer functions.So for the first one, we'll get states in action.
      //I want to update the is loading flag to be true when our request starts.When everything goes as expected, that's a fulfilled case.We will change.
      //State is loading.Back to false.And we're also going to take the user that was just created and is available on that action payload property.
      //And we're going to add it into the list of users that we already have.So we're going to push that new user into our data array. So we'll do state data.Push.Action.Payload.
      //And then on rejected down here again we will change is loading back to false.And remember, on the rejected case, if something goes wrong, we're going to get that air object on the action air property.
      //So we will set state air to action air.And that's it.
      builder.addCase(addUser.pending, (state, action) => {
         state.isLoading = true;
      });
      builder.addCase(addUser.fulfilled, (state, action) => {
         state.isLoading = false;
         state.data.push(action.payload);
      });
      builder.addCase(addUser.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.error
      });
      //And now we're going to add in three more to deal with removing a user.So I'll put in builder add case.I'm going to copy it three times.
      //Well then do remove user.Not pending.Remove user dot fulfilled.Remove user dot rejected.
      //And then on all three I'm going to put in my reducer function.I'm just going to write out one and then copy it.All right, let's go through each of these.
      //Well, first, take care of the is loading and the air state updates.So for pending we want to set state is loading to be true.In the other two we want state is loading to be false.
      //If the request is rejected or if the request fails and we end up in this rejected case, we need to take the errror off the action object and use that to update our state.
      //So we'll add in state.error is action.error .So then the last thing we need to add in here is when we successfully delete a user, we then need to go into our local state.
      //So let's look at the diagram over here really quickly.
      builder.addCase(removeUser.pending, (state, action) => {
         state.isLoading = true;
      });
      //So that's what we need to do in the fulfilled case.That's what we have to do right here.
      //And that is the little issue related to what I mentioned.Just a moment to go inside the remove user thunk.
      //So remember, I just put in this comment right here that said we have to fix this.Yeah, that's related to deleting the user out of our local data array.
      //The real issue here is making sure it's super clear inside of our reducer which user we actually want to delete.
      //So which user is it?What is their ID?Who are we trying to delete?We're going to come back to this issue in a little bit.
      //So we're going to come back to this.We're going to fix it all up.We're going to go into more detail.
      //For right now, I'm just going to go back over to the reduce right here.I'm going to add in a comment that says fix me.
      //And I'll do a console.log of action.Again, this is an error that you're probably going to run into on your own personal projects.
      builder.addCase(removeUser.fulfilled, (state, action) => {
         state.isLoading = false;
         state.data = state.data.filter((user) => {
            return user.id !== action.payload.id;
         })
      });
      builder.addCase(removeUser.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.error;
      });
//These reducer functions handle the addUser and removeUser actions in a similar manner.
//The pending action sets isLoading to true, the fulfilled action updates the state accordingly (adding the new user or removing the deleted user), and the rejected action sets isLoading to false and stores the error.
   },
});

export const usersReducer = usersSlice.reducer;
//The usersReducer variable contains the reducer function generated by the createSlice function, which will be used to update the state for the "users" slice in the Redux store.

//Overall, this code defines a slice of the Redux store for managing users, including the loading state, user data, and error handling.
//It sets up reducer functions to handle actions related to fetching users, adding users, and removing users.
