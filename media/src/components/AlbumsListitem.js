import Button from "./Button";
import { useRemoveAlbumMutation } from "../store";
import { GoTrashcan } from "react-icons/go";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from "./PhotosList";
//This block imports the necessary dependencies and components for the AlbumsListItem component.
function AlbumsListItem({album}){
//Defines the AlbumsListItem functional component and destructures the album prop from the component's props.
    const [removeAlbum,results] = useRemoveAlbumMutation()
//Calls the useRemoveAlbumMutation hook and assigns the returned values to removeAlbum and results variables. 
//This hook handles the mutation operation for removing an album.
    const handleRemoveAlbum = () => {
        removeAlbum(album);
    }
//Defines a function handleRemoveAlbum that calls the removeAlbum mutation function, passing in the album object as an argument.
    const header = <><Button className="mr-2" loading={results.isLoading} onClick={handleRemoveAlbum}><GoTrashcan/></Button>{album.title}</>
//Creates a header JSX element that represents the header content for the ExpandablePanel component. 
//It consists of a Button component with the trashcan icon (GoTrashcan) and the title of the album.   
return  <ExpandablePanel key = {album.id} header={header}>
    <PhotosList album={album} />
    </ExpandablePanel>
}
//Renders the JSX content of the AlbumsListItem component. It returns an ExpandablePanel component with the provided key and header props. 
//Inside the panel, it includes the PhotosList component, passing in the album prop.
export default AlbumsListItem;
//The code assumes the existence of several components (Button, ExpandablePanel, PhotosList) and the usage of the useRemoveAlbumMutation hook from the "../store" module.