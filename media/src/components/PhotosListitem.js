import { GoTrashcan } from "react-icons/go";
//This line imports the GoTrashcan icon component from the react-icons/go library.
import { useRemovePhotoMutation } from "../store";
//It also imports the useRemovePhotoMutation hook from the ../store module or file.

function PhotosListitem({photo}){
//This line declares a functional component named PhotosListitem that accepts a prop named photo.
    const [removePhoto] = useRemovePhotoMutation();
//This line uses the useRemovePhotoMutation hook and initializes a variable removePhoto with the value returned by the hook.
    const handleRemovePhoto = () =>{
     removePhoto(photo);
    }
//This line defines an arrow function named handleRemovePhoto that calls the removePhoto function (from the useRemovePhotoMutation hook) with the photo prop as an argument. 
//This function is intended to handle the action of removing a photo.
    return(
//This code block returns a JSX element representing a single photo item in the list. 
    <div onClick={handleRemovePhoto} className="relative cursor-pointer m-2">
{/*The div element is set to trigger the handleRemovePhoto function when clicked (onClick={handleRemovePhoto}) */}
        <img className="h-20 w-20" src={photo.url} alt="random pic"/>
{/*It contains an img element that displays the photo using the photo.url as the source.*/}
        <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
{/*Inside the div, there is an absolute positioned div that serves as an overlay when hovered over.*/}
            <GoTrashcan className="text-3xl"/>
{/*This overlay contains the GoTrashcan icon component from the react-icons/go library.*/}
        </div>
    </div>)
}

export default PhotosListitem;