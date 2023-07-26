//thunk vs rtk query --humne albums or photos ke liye use kiya hai rtk query...or users ke liye thunk
//users ka post , get or remove hua hai simple thunk se..albums or pictures ka hua hai rtk query se .Inside of the body of the request.We're going to include some properties we want to assign to this user.
//We've now got a ton of reminders on how we work with JSON server steering and take all that knowledge and start to apply to the world of Redux.
//We're going to understand how we can fetch data inside of a Redux application. Now inside of a Redux Toolkit app in particular, there are usually two different ways in which we fetch data.
//We either make use of something called async thunk functions or we use a little module inside of Redux toolkit called Redux Toolkit query.
//So these are two very different ways of fetching data and getting access to data from a remote API inside of your application.
//Usually you are not going to use both these techniques on a single project. You're usually going to decide to use one or the other.
//In this case, for our application, just so we can understand both these things, we're going to use them both in one project.
//So again, not super typical, but we're just trying to understand how these things work. So we're going to use both these techniques in one app.
import {configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {usersReducer} from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi';
import {photosApi} from './apis/photosApi';
//These lines import necessary dependencies and modules from Redux Toolkit and custom files.

//So we're going to not really do a basic data fetching system here.We're going to go pretty deep into this and we're going to really understand a lot of different concerns around fetching data with Redux.
//So first off, we're going to assume that the user, whoever is making use of our application, is on a bandwidth constrained connection.
//So maybe they are on a mobile device and their Internet connection is a little bit spotty.This is immediately going to have a really big impact.
//Let me explain exactly why that is.So whenever our application first starts up, we're going to have to fetch some data to display to the user.

export const store = configureStore({//This code sets up the Redux store using configureStore function from Redux Toolkit.
    reducer:{//It provides a reducer configuration where usersReducer is assigned to the users key, and albumsApi.reducer and photosApi.reducer are assigned to the corresponding keys obtained from albumsApi and photosApi respectively
        users:usersReducer,
//So if you have never seen this syntax before, totally fine.This does not create an array.That is not what is happening here.
//What this does is it says, Go and look up the reducer path property.It is a string and whatever that string is.Put a new key inside of this object of whatever that string is.
//So in this case, you can imagine that little bit right there gets condensed down when we actually run our code to albums.
//Again, we're just using this fancy syntax so we don't have to repeat ourselves with that string.Next up is part is going to be a little bit confusing.We might come back a little bit later on and discuss it in greater detail.
//But right now, just understand it's a required part of the setup process.So we're going to add in.A middleware property//This is going to be a function that gets called with an argument of git default middleware.And inside this function we're going to return get default middleware.We're going to call it.
        [albumsApi.reducerPath]:albumsApi.reducer,//albumsApi.reducer = albums('albums ')
        [photosApi.reducerPath]:photosApi.reducer//photsApi.reducer = photos('photos)
    },
//In Redux Toolkit, getDefaultMiddleware is a function that returns the default middleware stack. It includes commonly used middleware such as Redux Thunk, Redux Saga, and Redux Logger.
//In the provided code snippet, the middleware property is defined as a function that takes getDefaultMiddleware as an argument. Inside this function, the default middleware stack is obtained by calling getDefaultMiddleware(). 
//Then, the middleware from albumsApi and photosApi are appended to the default middleware stack using the concat method.
    middleware: (getDefaultMiddleware) =>{
//By extending the default middleware stack with additional middleware, you can customize the behavior of the Redux store and add extra functionality. In this case, the albumsApi.middleware and photosApi.middleware are likely custom middleware provided by Redux Toolkit Query.
//These middleware are responsible for handling data fetching and caching logic for the respective APIs.
        return getDefaultMiddleware()
        .concat(albumsApi.middleware)
        .concat(photosApi.middleware)
    }
//By concatenating these custom middleware with the default middleware stack, the Redux store will be able to handle data fetching requests and manage the state for albums and photos using Redux Toolkit Query.
});
//setupListeners is a function provided by Redux Toolkit Query. It sets up listeners to intercept dispatched actions and handle data fetching automatically. It is typically called after creating the Redux store to enable the built-in query behavior.
//By calling setupListeners(store.dispatch), you are initializing the listeners for the Redux store. This ensures that the data fetching operations defined in your APIs, such as albumsApi and photosApi, 
//are automatically triggered when corresponding actions are dispatched.
setupListeners(store.dispatch); 
//The purpose of setupListeners is to simplify the integration of Redux Toolkit Query with your Redux store. It eliminates the need to manually handle data fetching actions and reduces the amount of boilerplate code required to manage API requests and data caching.



//purpose of store
//And remember, this is also going to serve as a central export point for everything related to our redux stuff.
//And we're doing that so that our components don't have to import from these deeply nested slices files and whatnot.
//So inside of this store index file, we will import, configure store. From at Redux Jazz Slash Toolkit.I will import the users reducer from slices users slice.
//Overall, this code sets up the Redux store with reducers, middleware, and query setup. It exports various functions and hooks related to data fetching using Rtk and Rtkquery.
export * from './thunks/fetchUsers';
//The syntax right here just means find everything that gets exported from this file and export it from the index case file as well.
export * from './thunks/addUser';
export * from './thunks/removeUser';
//Use fetch albums query.So that is our special hook that we exported a moment ago from Slash APIs, slash albums, API
//And step nine, we're going to use that hook so we can finally use the hook inside of a component.And believe it or not, this is definitely the easiest step, thankfully
//Inside of our albums list component, as we've seen several times, whenever this component is rendered on the screen, we want to fetch all the different albums tied to this particular use this right here, 
//this component, this is where we want to fetch some data.this is where we are going to make use of that hook
//I'm going to add in an import for use fetch albums query.From up one directory store and then inside of the component, I'm going to actually call that hook
//Now you'll notice that we do not have to put this inside of a useeffect function.We don't have to put it inside of a click event handler or anything like that.We can just call it whenever we call this hook, we are going to immediately try to fetch some data
export {useFetchAlbumsQuery , useAddAlbumMutation,useRemoveAlbumMutation} from './apis/albumsApi';
//So in step five, we're going to export the thunk from the store indexed JS file.
//The only reason we're doing this, remember, if we allow our components to import from individual files inside the store, we just end up with some really, really messy components because we've got import statements all over the place.
//So I'm using these store index JS file as my central export point for everything related to Redux.So all my components can import from this index file and they don't have to go into this directory and try to find individual files and whatnot.
//It's the only reason we are doing this export.So inside of store indexed eggs at the very bottom, I'm going to do export star from slash dunks,fetch users.
//The syntax right here just means find everything that gets exported from this file and export it from the index case file as well.
export{
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
}from './apis/photosApi';