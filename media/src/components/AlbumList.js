//All of the content displayed inside of the bottom panel of the expandable panel component is going to be rendered by the albums list.
//We need to create this component and we're going to make a big assumption right now.We're going to assume that we're going to pass it as a prop, the user record or the user object.
//Remember that object that has an ID and a name for a user?We're going to pass that down as a prop to this component.
//For right now, our goal is to just print out something like this message right here, something it says Album spy and then the user's name.
//To get started.Back over inside my editor.I'll make a new file inside the components directory called Albums List JS.I'll then create my component.
//I'll export it.In the props list.Again, I'm going to make a big assumption.I'm going to assume that I'm going to pass in the user record.
//I'm going to receive that as a prop called user.I'll then return.Right now just a div that says albums for.And then user name.
import { useFetchAlbumsQuery , useAddAlbumMutation } from "../store";//add album and fetch album from rtkquery albumsapi.js remocealbummutation in AlbumListItem.js
import Skeleton from './Skeleton';
//import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumsListItem from "./AlbumsListitem";
//This block imports the necessary dependencies and components for the AlbumsList component.
function AlbumsList({user}) {
//So we're going to eventually.Import that automatically generated hook called use fetch albums query.And we're going to run that hook by writing out some code that looks pretty much just like this.
//This hook by itself is going to automatically fetch data for us.While it is making a request, we're going to get back a loading flag or a Boolean to describe whether or not we are in the process of making the request.
//If is loading is true, that's probably a sign that we want to show a loading spinner to the user If something goes wrong with the request, error is going to be an object that describes exactly what went wrong and the actual data that gets fetched.
//So a list of albums is going to be available as this data property.So inside of our component, we're going to do something with those three different properties.
//We're going to maybe map over data and display the list of albums.And again, as we're making the request, we're going to show a loading spinner by using the is loading flag.  
 const {data,error,isLoading} = useFetchAlbumsQuery(user);//Calls the useFetchAlbumsQuery hook, passing in the user prop, and assigns the returned values to data, error, and isLoading variables. This hook fetches the albums data associated with the user.
//--up up ...isLoading explaination
//We're going to say that if is loading is true, we want to show expandable or not expandable panel.We want to show skeleton one show, that kind of loading spinner of sorts.So I'm going to add in.
//A new variable called content.And if is loading is true, then I want to set content to be skeleton.
//Remember that whenever we show skeleton, we have to pass in a times that times prop is used to dictate exactly how many skeleton boxes we're going to show.
//So I'm going to put in a times of how about just three?I think that'll do for now.And then otherwise, if we are not loading and there was no error, that means that we must have some data.
//So in that case, we're going to map over that array of album objects.And for each one we're going to create one of those expandable panels and we're going to make sure that it has a header of the album's title.
//So I'm going to set content down here to be data map.And for every album object.I'm going to return.Expandable panel. 
 const [addAlbum , results] = useAddAlbumMutation();//[addAlbum,results] = {data,error//[addAlbum],isLoading//[results]}
//So it's really clear that the hooks we use for a query are very different than the hooks we use for a mutation.So whenever we use a query hook, this thing is going to make a request to fetch some data whenever our component is first displayed on the screen.
//And this is the default behavior, we can tell a query hook to delay that fetching operation, but usually whenever we show a component, we immediately need some data.
//So that's how a query hook works.By default, whenever you call that query hook, you get back the results object and that has a bunch of different properties inside of it to describe the data fetching process along with the actual data that was fetched.
  console.log(results)
//You and I can write out some code to say whenever we go off and call the ADD album mutation right here inside of albums list we could add in some code that says manually go and re fetch the list of albums
//But that's not how we usually do things with Redux Toolkit query.Instead, we're going to use the library to set up some automatic data fetching
//We're going to set up a little rule that says any time we call this mutation automatically go off and refetch the list of albums.Now to implement this, we're going to use  the tag system in rtk Query.Now, the tax system at first glance is just a little bit challenging to understand
//It's a lot easier to understand if you first get a little bit of exposure, if you kind of understand how Internally Redux Toolkit query tracks requests that are being issued we're going to do a very quick aside here, little tiny side topic
//We're going to take a look iat how Redux Toolkit query internally tracks requests and keeps track of what data is being fetched and so on  
  const handleAddAlbum = () =>{
   addAlbum(user);
  }//Defines a function handleAddAlbum that calls the addAlbum mutation function, passing in the user object as an argument.

  let content ;
  if(isLoading){
    content = <Skeleton className="h-10 w-full" times={3}/>
  }else if(error){
    content   = <div>Error loading Albums.</div>
  }else{
    content = data.map(album => {
      return <AlbumsListItem key={album.id} album={album}/>
    })
  }
//This block assigns the appropriate content based on the state of the data fetching process. 
//If isLoading is true, a Skeleton component is rendered to indicate loading. If there's an error, an error message is displayed. 
//Otherwise, the data is mapped over to generate AlbumsListItem components for each album.
return <div>
  <div className="m-2 flex flex-row items-center justify-between">
  <h3 className="text-lg font-bold">Albums for {user.name}</h3>
  <Button loading={results.isLoading} onClick = {handleAddAlbum}>
    + Add Album 
  </Button>
  </div>
  <div>
    {content}
  </div>
  </div>;
//Renders the JSX content of the AlbumsList component. It displays a heading with the user's name and a button to add an album. The content variable is rendered inside a <div> element.
}
//Okay, let's save this.And now we want to show this component inside of users list item, because users list item is responsible for rendering out or displaying one individual user.
//Inside of users list item at the top
export default AlbumsList;