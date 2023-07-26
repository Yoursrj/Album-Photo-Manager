import {useFetchPhotosQuery,useAddPhotoMutation} from '../store';
//This line imports the useFetchPhotosQuery and useAddPhotoMutation hooks from the ../store module or file.
import Button from './Button';
//This line imports the useFetchPhotosQuery and useAddPhotoMutation hooks from the ../store module or file.
import Skeleton from './Skeleton';
//This line imports the Skeleton component from the Skeleton.js file located in the same directory as the current file.
import PhotosListitem from './PhotosListitem';
//This line imports the PhotosListitem component from the PhotosListitem.js file located in the same directory as the current file.
function PhotosList({album}){
//This line declares a functional component named PhotosList that accepts a prop named album.
    const {data,isFetching,error} = useFetchPhotosQuery(album);//isse fetch hora 
//This line calls the useFetchPhotosQuery hook, passing the album prop as an argument. 
//It initializes three variables: data, isFetching, and error with the corresponding values returned by the hook.
    const [addPhoto,addPhotoResults] = useAddPhotoMutation();//addphotomutation se aara hai url of photo
//This line calls the useAddPhotoMutation hook and initializes two variables: addPhoto and addPhotoResults with the corresponding values returned by the hook.
    const handleAddPhoto =() =>{//isse add hora bhai
        addPhoto(album); //??       
       }
//This line defines an arrow function named handleAddPhoto that calls the addPhoto function (from the useAddPhotoMutation hook) with the album prop as an argument.
//This function is intended to handle the action of adding a photo.
       let content; 
//This line declares a variable named content without assigning any initial value.
       if(isFetching){
        content = <Skeleton className="h-8 w-8 " times={4}/>
//This code block checks if isFetching is true. If it is, the content variable is assigned a JSX element <Skeleton className="h-8 w-8" times={4} />,
// which likely renders a loading skeleton for a photo. It indicates that the photos are being fetched.
       }else if(error){
        content = <div>Error Fetching photos...</div>
//This code block checks if error is truthy. If it is, the content variable is assigned a JSX element <div>Error Fetching photos...</div>,
//which displays an error message indicating that there was an error fetching the photos.
       }else{
        content = data.map(photo=>{
            return <PhotosListitem key={photo.id} photo={photo}/>
        })
       }
//This code block executes if neither the isFetching nor the error condition is met. It assigns the content variable the result of mapping over the data array (assuming data is an array) and rendering a PhotosListitem component for each photo in the array.
//Each PhotosListitem component is given a unique key prop based on photo.id and is passed the photo prop.
        return (
        <div>
        <div className='m-2 flex flex-row items-center justify-between'>
            <h3 className="text-lg font-bold">Photos in {album.title}</h3>
            <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
                + Add Photo
            </Button>
        </div>
        <div className="mx-8 flex flex-row flex-wrap justify-center">
            {content}
        </div>
    </div>
    );
//The remaining code defines the structure of the PhotosList component's JSX markup, including the header, the button for adding a photo, and the container for displaying the content. 
//The content variable is used within the JSX to render the appropriate content based on the state (loading, error, or data).
}

export default PhotosList;
//This line exports the PhotosList component as the default export of the module, making it available for other parts of the application to import and use.