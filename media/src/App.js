import UsersList from "./components/UsersList";
//So a better approach if our user is on a constrained internet connection, is to implement lazy fetching,and this is what we're going to focus on.
//So whenever our application starts up, we're going to make a single request that asks for the minimum amount of data possible.
//We're going to ask just for the list of users.So just tell us what the names of all the users are that we should show on that initial page.
//So kind of like this data right here, just the list of users.And then if we click on this thing right here to expand it, we then make another follow up reques to get all the photos that exist inside of album number one
//So again, we refer to this as lazy fetching We are only fetching data as it is actually needed to display it on the screen
//So that's going to be a big requirement on this project Again, we're going to make a lot of different features, a lot of different little tiny changes to our code base, just to account for the fact that the user might not have the best Internet connection
function App(){
    return (
        <div className="container mx-auto">
         <UsersList/>
        </div>
    );
}
export default App;