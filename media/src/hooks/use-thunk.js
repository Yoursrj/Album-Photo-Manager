//Okay, so now we have these two pieces of state to keep track of whether we are loading data and whether or not there was an error.
//So now we should be able to do a test and see if this actually works.So over here, I'm going to refresh.
//I should still see the skeleton loader when I'm loading up the list of users.If I go to the fetch users, thunk again and break that URL by deleting the H, I should see an error.Yep, I see that too.So it works.So that is kind of a miniature overview of option number one.
//We have taken some of this loading state out of our Redux store and we're maintaining it inside of our component as well.
//We're going to repeat this process basically the same exact thing for keeping track of whether or not we are creating a user as well.
//Once we have done that, we'll then extract a lot of this stuff into a custom hook just to make it a little bit less tedious to write out.

//we're going to use async thunks to handle fetching the list of users, creating, deleting a user we're going to make use of RTQ to handle albums, photos in this diagram we got our flow of a component a user does something, we're going to dispatch an action goes off to our different reducers
//We produce state and that state goes back over to our component in this entire flow where do we actually write in some logic to make a network request?
//you must never make a request from this particular area and that is from inside of a reducer in no scenario ever are we ever going to try to make a request from inside of a reducer function
//Reducers should always be 100% synchronous so they should always take in some state and actio, make an update to states they are never going to have any logic related to making a request
//They're never going to have any API calls, no promises, no async await, nothing like that Instead any time we need to make a request we're always going to use one of these two techniques


//states in redux-
//And then inside of our different components, we can have individual pieces of state to keep track of whether we are currently loading users, creating users, whether or not there was an error with loading users or creating users.
//And then when we go and try to render out each individual user, maybe with a component called users list item, each instance of those components can have its own piece of state called is deleting user so we can keep track of which user is being deleted at any given time.
//Now, when I show you this, your first reaction might be, Hey, wait a minute.State in components???.We're making use of Redux here.//And I've gone really far out of my way several times in the previous videos and the previous applications we have worked on with Redux to say when we use Redux, we keep track of all of our states inside the store.
//fetching me get krne me error jo aayenge fetchusers thunk se uske liye loading state or error state jayenge isLoadingUsers or isLoadingUsersError me respectively or final result jayega dofetchUsers me
import { useState,useCallback } from "react";
//The code imports the useState and useCallback hooks from React. These hooks are used to manage component state and create memoized callback functions, respectively.

//Hey, wait a minute.State in components?We're making use of Redux here
//And I've gone really far out of my way several times in the previous videos and the previous applications we have worked on with Redux to say when we use Redux, we keep track of all of our states inside the store Well
//Yes and no..When we make use of Redux, we absolutely still can have state in components example of this is something like a dropdown
//dropdown might have a single piece of state that just records whether or not the dropdown is open or closed That is a piece of state that doesn't really make a lot of sense to store inside of Redux
//we instead might make use of component state like the very classic use state hook to check whether or not the dropdown is open
//when we make use of Redux just to be clear yeah, we can still have state in our components but if we do it kind of defeats the purpose of using Redux in the first place
//option number one right here, although it would solve our problems and be pretty easy to implement
import { useDispatch } from "react-redux";
//The code imports the useState and useCallback hooks from React. These hooks are used to manage component state and create memoized callback functions, respectively.

//Okay, so let's get started on the actual implementation.I'm going to undo all those changes.And then right about my components, I'll make my hook function.
//I'm going to call it use thunk.We're going to eventually extract this into a separate file.
//But right now I'm just going to write out right here.So inside of here, I'm going to receive an argument that I'll call Thunk.
//So that is going to be the thunk function that we eventually want to run and dispatch.Then at the top I'm going to create is loading and set is loading.I'll default that to false.
//An error.And setError.And he felt that to know.I'll then make a function called Run Thunk.So this is the function that is going to actually run our thunk and dispatch it and update the loading state in the air state along the way.
//So inside of here I'm going to first set is loading.To true.I'm then going to dispatch our trunk, making sure that I call the thunk itself.We need access to the dispatch function inside of our hook
 
export function UseThunk(thunk){//The thunk argument represents the thunk function that will be dispatched.
//This function is declared to create a custom hook for handling thunks (asynchronous actions) in Redux.

   //So simple enough, this is going to be either true or false to keep track of whether or not we are loading up the big list of users.
   //If it is true, we're going to want to show the skeleton loader component.If it is false, don't show it.
   //And then likewise, this errorstate is going to start off as null.If we ever get an error with our request, we're going to update this piece of state with the error.
   //And if this thing is not null, we're going to want to show an error message to the user on the screen.Next up, I'm going to find the use selector.
    const [isLoading , setIsLoading] = useState(false);
//Two state variables, isLoading and error, are initialized using the useState hook.
//isLoading keeps track of whether the thunk is currently being executed (loading state).
    const [error , setError] = useState(null);
//error stores any error that occurs during the thunk execution.
    const dispatch = useDispatch();
//The useDispatch hook is called to get access to the dispatch function from the Redux store.

    //Use callback allows us to create a function and only actually redefined that function.If it changes in some way.
    //If you don't remember how you used callback works, I would recommend maybe go back to those videos and just rewatch them really quickly.
    //To make sure that we do not eventually infinitely run this using fact right here, over and over and over again.
   
    const runThunk = useCallback((arg) =>{//The runThunk function is defined using the useCallback hook to memoize the function and prevent unnecessary re-renders.
   
      //Now this is where we're going to get a little bit more understanding on the dispatch function to indicate that we are about to start loading users and a change this thing to show the skeleton loader.
    //Well, super simple.Right before we call dispatch, we could update isLoading users.So we'll call set is loading users.
    //And we'll set that to be false or something.Set that to be true.So we're going to update that state.
    //And then in the next millisecond, basically, we're going to start the request.So now we need to somehow detect when the request is completed and when it is completed, we need to change.Is loading users back to false.
    
    setIsLoading(true);//When runThunk is called, it sets isLoading to true to indicate that the thunk is being executed.
    dispatch(thunk(arg))//The thunk function (thunk) is dispatched using the dispatch function.
    
    //And the promise just doesn't really behave in the way you would expect.But we can fix this up a little bit by calling a function on here called Unwrap.
    //Unwrap is going to give us a brand new promise back, and the promise we get back is going to follow the conventional rules.
    //the promise against return from unwrap, if we chain on a dot, then this is going to be called only if the request succeeds.
    //And if we chain on a catch, this is going to be called only if the request fails, and we can test that out really easily. in the dot, then I'll put in a console.log of success.
    //And in the catch I'll put in a console log of fail.Well, then save this Look back over. And now I'll see the console log of success. And to make sure the fail works correctly.
    
    .unwrap()//The unwrap() function is called on the dispatched promise to handle the success and failure cases.
    .catch(err => setError(err))//If the promise is rejected (request fails), the catch block is executed to set the error state with the error object.
    .finally(()=>setIsLoading(false))//If the promise is fulfilled (request succeeds), the catch block is skipped, and the finally block is executed to set isLoading back to false.
    },[dispatch,thunk]);
    return [runThunk,isLoading,error];
    //The custom hook returns an array with three values: runThunk, isLoading, and error.
    //runThunk is the memoized function that can be called to execute the thunk and handle loading and error states.
    //isLoading indicates whether the thunk is currently being executed.
    //error stores any error that occurs during the thunk execution.
    }

     //.then .catch --> wala syntax
    //So whenever we call dispatch and we put in one of those async dunks, it's going to give us back a promise.But completely unexpected.And this is done on purpose, but it is unexpected.The promise that we get back, if we chain on a data and statement, it is going to be called automatically whenever the request succeeds or fails.
    //And that or part is very unexpected.Usually a dot then is only called if the underlined request succeeds.So if this request fails, the dot then will be invoked.And again, that is very much unexpected.
    //The argument to the aero function we pass into the DOT, then method is going to be called with the fulfilled or the rejected action object.
    //So the same action object that usually gets dispatched off to all of our different reducers.
    //We could use that argument to detect whether or not the underlying request was successful or not, but that is a little bit tedious and be just a little bit challenging to do.
    //So instead, we're going to use kind of an escape hatch.

//PURPOSE of use-thunk.js-->
//The purpose of the use-thunk.js file is to define a custom hook called UseThunk that simplifies the handling of thunks (asynchronous actions) in Redux. 
//Thunks are typically used for making API requests or performing other asynchronous operations before dispatching regular actions to update the state.

//the UseThunk hook takes a thunk function as an argument and returns an array containing a memoized function (runThunk) and two state variables (isLoading and error).

//The runThunk function executes the thunk by dispatching it using the dispatch function from the Redux store. 
//It also handles loading and error states by setting isLoading to true before executing the thunk, and then updating isLoading to false and error based on the success or failure of the thunk execution.

//By using the UseThunk hook, components can easily execute thunks, manage loading states, and handle errors without having to write repetitive code for each thunk.
// It encapsulates the common logic and provides a cleaner and more efficient way to handle thunks in Redux.