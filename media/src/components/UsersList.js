//The goal is custom hook is to wrap up some of this loading states and the air state as well.Now, implementing this hook is not going to be super challenging.
//So we're going to just kind of dive right into it.We're going to write out the code.
//I could show you a bunch of diagrams, but I don't think they're going to be super helpful.There's really only one tricky part to implementing this hook is the fact that we need to make use of that use callback hook from React.
//You might recall that we spoke about use callback way earlier on inside the course.That's really the only tricky part.
//Having said that, I do want to give you a little bit of a preview.I want to help you understand what the goal here is.What is this hook going to do?Exactly.
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import { fetchUsers,addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import UserListItem from './UserListItem';
import { UseThunk } from '../hooks/use-thunk';
//These lines import various dependencies and components required for the UsersList component.
//And as you'd guess, the goal of this component is really just to show a display or a list of users.
//So pretty much just this right here, that's what we're going to focus on inside of users list.So let's create that component right away and then display it inside of our app component.

//So we're just going to ignore those right now and we're just going to worry about one component called users list.
//And as you'd guess, the goal of this component is really just to show a display or a list of users. So pretty much just this right here, that's what we're going to focus on inside of users list.
//So let's create that component right away and then display it inside of our app component.
//Okay, so we've got a component to workout of.Now it's time to start to focus on the redux side of things.So we're going to start to create a Redux store.
//We're going to add a slice to it.We're going to make sure this slice is in charge of somehow maintaining a list of users that we're going to fetch from our API.

//useSelector-Remember, we make use of use selector to access our states inside of a component.
//Inside of users list we're going to get access to is loading data and air.And depending upon these different values, we're going to show either the loading message list of users or some kind of error message.
function UsersList () {
//This line declares a functional component named UsersList.
  const [doFetchUsers,isLoadingUsers,loadingUsersError]= UseThunk(fetchUsers);
  //These lines use the UseThunk custom hook to dispatch the fetchUsers and addUser thunk actions.
   //ADDING me post krne me error jo aayenge addusers thunk se uske liye loading state or error state jayenge isCreatingUser or creatingUserError me respectively or final result jayega doCreateUser me
   const [doCreateUser,isCreatingUser,creatingUserError]= UseThunk(addUser);
//The values returned by the UseThunk hook are destructured into variables. For example, doFetchUsers is a function that triggers the fetching of users, 
//isLoadingUsers is a boolean value indicating whether the fetching is in progress, and loadingUsersError is a boolean value indicating whether an error occurred during the fetching.
   const {  data } = useSelector((state)=>{
    return state.users; // {data : [] , isLoading: false , error : null }
//This line uses the useSelector hook from React Redux to access the data property from the Redux store's users slice.
   });
  //Then inside of our component, I'm going to get access to the dispatch function.
  //I'm going to add in a use effect as a reminder, this thing is going to run automatically the first time our component is rendered onto the screen.
  //If we put in an empty array as the second argument.And then finally, here's the big step inside of here. We're going to run our thunk.
  //And we do so by calling dispatch, and we're going to pass in, fetch users and call it. You might get a warning from the empty array right here.
  //If you mess over, it's going to tell you that you need to add in the dispatch function. This is not actually required.
  //It is kind of an erroneous error coming from the Eslint package.So you do not actually have to.But just to make the warning go away, I will add in dispatch.
   useEffect(()=>{
      doFetchUsers()
   },[doFetchUsers]);
//This useEffect hook runs when the component is first rendered (since the dependency array [] is empty). It triggers the doFetchUsers function to fetch the users.
    const handleUserAdd = () =>{
      doCreateUser();
//This line defines an arrow function named handleUserAdd that calls the doCreateUser function (dispatched thunk) to add a new user. 
//This function is intended to handle the action of adding a user.
   }
   //As I just mentioned, I want to only show this skeleton thing on the list of users.do not want to hide the header when we are trying to fetch some data.
   //So we're going to go back into our component and we're just going to fine tune this thing, do a little bit of fine tuning around what content we show when.
   //So right now inside of users list, if we scroll down a little bit, we've got one if statement right here.

   //So we're going to kind of reorder this component a little bit.I want to always, no matter what, return this, Jess.
   //And the only thing I change is going to be the content I show right here.So if we are in the process of loading, I want to show the skeleton stuff.
   //If there was an error, I want to show the error text and if everything went okay and we fetched our data, I want to show the list of users.
   //So like I said, we're going to make a couple of small changes to our component to make that happen.
   
   let content;//These code blocks determine the content variable, which represents the JSX content to be rendered.
   
   //So simple enough, this is going to be either true or false to keep track of whether or not we are loading up the big list of users.
   //If it is true, we're going to want to show the skeleton loader component.If it is false, don't show it.
   //And then likewise, this errorstate is going to start off as null.If we ever get an error with our request, we're going to update this piece of state with the error.
   //And if this thing is not null, we're going to want to show an error message to the user on the screen. Next up, I'm going to find the use selector.
   
   
   //So simple enough, this is going to be either true or false to keep track of whether or not we are loading up the big list of users.
   //If it is true, we're going to want to show the skeleton loader component.If it is false, don't show it.
   //And then likewise, this errorstate is going to start off as null.If we ever get an error with our request, we're going to update this piece of state with the error.
   //And if this thing is not null, we're going to want to show an error message to the user on the screen.Next up, I'm going to find the use selector.
   if(isLoadingUsers){
      content =  <Skeleton times = {6} className="h-10 w-full"/>
   }
//If isLoadingUsers is true, the content is set to a Skeleton component with times={6} to display loading skeletons for 6 users.
   if(loadingUsersError){
    content =  <div>Error fetching data</div> 
   }
//If loadingUsersError is true, the content is set to display an error message indicating that there was an error fetching the data.   
   else{
      content = data.map((user)=>{
         return <UserListItem key={user.id} user={user}/>
    });
//Otherwise, if fetching is successful, the content is set to a mapping over the data array (assuming data is an array) and rendering a UserListItem component for each user.
   }
//Spinner button  = It doesn't make a lot of sense that when we are creating a new user, we display or we hide the existing user.
//So we already fetchI don't think that is a UI that makes a lot of sense.
//I want to make sure that whenever we are in the process of creating a user, we show a spinner on only this button or at least disable the button or something like that
//I want to make sure it's clear that when we are trying to create a new user user understands that the person who clicked the button says, okay, I get it We see a spinner here, a new user is being created.
 return (//This code block returns the JSX markup of the UsersList component.
 <div>
   <div className="flex flex-row justify-between items-center m-3">
      <h1 className='m-2 text x-l'>Users</h1>
      {/*And then whenever someone clicks on this thing, I'm going to run a callback.It will name handle, user add.
      So let's go into fine this event HANDLER right away.Towards the top of my component.So right after the use effects, I usually like to put our event handlers right after using fact.
      You could put it before or after.I think we've kind of done both.Inside this course.I'll define handle user add.
      So here's what I want to do.I want to make sure that whenever we are in the process of creating a user, we show a spinner on only this button or at least disable the button or something like that.
      I want to make sure it's clear that when we are trying to create a new user, user understands that the person who clicked the button says, okay, I get it. We see a spinner here, a new user is being created.
      */}
      {/*
    //So we're going to show an actual loading spinner.But right now I just want to make sure that the loading stuff works.
    //So I'm going to put in a set of curly braces and then we're going to write in a ternary expression inside of here.
    //So I'm going to say if.Creating or is creating user.If that is truthy, then I want to show the text that says creating user.
    //Otherwise I'm going to show that button element. 
    
    It renders a header section with a title (Users) and a button (+ Add User) to add a new user.
   The loading prop of the Button component is set to isCreatingUser to handle the loading state.*/}
     <Button loading = {isCreatingUser} onClick= {handleUserAdd}>
        + Add User        
      </Button>
      {/*And then right after that, I'm just going to print out the error directly if one occurred.So I'm going to print out.
      What is it creating or about?What was it called?I got to check that state name.These names, as you see here, are really tedious, so it's creating user error.
      So some error occurred.Creating user error.If that is truthy, If we do have an error, I'll print out error creating.User.
      And again, we're going to come back in just a moment and make this stuff look a lot nicer than what it's going to look like right now.
      So let's save this.Do a quick test.If we click on add user, remember, we don't have any delay timer in there right now.
      So to make sure that we can actually see the loading message, I'm going to go to my network request tab.
      I'll add in some throttling really quick.So I'll go to a slow 3G.And now if I click on add user, I'll see creating user.And that goes back to being the button. */}
      {creatingUserError && 'Error creating user...'}
      {/*If creatingUserError is true, it displays an error message indicating that there was an error while creating a user. */}
   </div>
   {/*Finally, it renders the content variable, which represents the list of users (UserListItem components) or loading skeletons, based on the loading and error states*/}
   {content}
   </div>
   )
}

export default UsersList;

//what is the use of useSelector and useeffect in this code?

//In this code, useSelector and useEffect are both hooks provided by the React Redux library.

//Overall, useSelector enables accessing the state from the Redux store, 
//while useEffect allows performing side effects, such as fetching data, based on certain conditions in a functional component.




