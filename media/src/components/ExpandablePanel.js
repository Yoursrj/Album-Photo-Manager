//So this is pretty much exactly mirroring exactly what we did up here with the users list and users list item.
//We had users list to go and get the entire list of or all the different users, and we showed one users list item for each individual user.
//It's going to be the same thing down here for albums list and albums list item.Now we're going to worry about albums list and all that stuff a little bit more in just a moment.
//Right now, I want to focus on expandable panel.So let me tell you just a little bit about how we're going to make this component.
//It's going to be pretty straightforward, but we haven't really worked in great detail on components in a while.
import { useState } from "react";
//The code imports the useState hook from React, which allows us to manage state in functional components.
import {GoChevronDown ,GoChevronLeft } from 'react-icons/go';
//It also imports the GoChevronDown and GoChevronLeft components from the react-icons/go module. These components represent icons that will be used to indicate the expanded or collapsed state of the panel.

//So let me tell you just a little bit about how we're going to make this component.It's going to be pretty straightforward, but we haven't really worked in great detail on components in a while.
//So I just want to kind of get back into the world of React really quickly.So the expandable panel component, it's going to receive two different props.
//The first is going to be a header prop whatever we pass in as the header prop.So in our case, we're going to pass in a header prop of probably a button element and the user's name.
//We're also going to pass in some children and whatever children we pass in is going to be showed inside of this thing when it is actually expanded.
//Anytime user clicks anywhere inside this gray box, with the exception, of course, of the button right there, any click inside of here is going to expand the panel.So it's going to be kind of toggle able.
//We can click it to open it, click it again to close it.The actual JSX for this is going to end up looking something like that.
function ExpandablePanel({header,children}){
//The code defines a functional component called ExpandablePanel. It receives two props: header and children. The header prop represents the content to be displayed in the panel's header, 
//and the children prop represents the content to be displayed when the panel is expanded.
    const [expanded,setExpanded] = useState(false);
//Inside the component, it declares a state variable expanded using the useState hook. The initial state is false, indicating that the panel is initially collapsed.
   const handleClick =() =>{
    setExpanded(!expanded);
   }
//It also defines a handleClick function, which is called when the user clicks on the panel. It toggles the expanded state between true and false.
return (//This code represents the JSX code for the ExpandablePanel component.
    <div  className="mb-2 border rounded">{/*//It returns a div element with the class names "mb-2 border rounded", representing the outer container of the panel.*/}    
    <div className='flex p-2 justify-between items-center '>
{/*Inside the outer container, there is a div element with the class names "flex p-2 justify-between items-center", representing the header section of the panel. */}  
    
    {/*Inside of the innermost ear right here.This is where we want to display the header.
    So that's where the delete button and the user's name is going to be displayed.And then right above the bottom most closing div.
    We're going to add in a div with a class name of p-2 and border.Dash t.And this is where we are going to display our children.Now we need to add in some click events to detect user clicking on this thing and expand and collapse it.
    But right now let's just try using it inside of users list item and just make sure that we've got the styling and the structure generally put well together.
    So I'm going to save this.I'm going to go back over to users list item at the very top.I will import expandable panel.Then down here towards the bottom, I'm going to delete the three closing diffs.
    I'm going to take all this mark up right here.So it's going to be the button, the ear stuff and the user's name.I'm going to cut it and we're going to assign it to a variable right above.Called header.*/}    
     <div className="flex felx-row items-center justify-between ">
{/*Within the header section, there is another div element with the class names "flex flex-row items-center justify-between". This is where the header prop content is displayed*/}
        {header}
        </div>
{/*Next, there is a div element with the onClick event handler set to the handleClick function. This element represents the area where the user can click to expand or collapse the panel. Inside this div,
the GoChevronDown or GoChevronLeft component is rendered based on the value of the expanded state*/}
        <div  onClick={handleClick} className="cursor-pointer" >
        {expanded ? <GoChevronDown/>: <GoChevronLeft/>}
        </div>
        </div>
        {/*So we can use another set of curly braces we'll look at expanded.And if expanded, is true.
        So in this case, we can do just an And operator.Then we want to display the div with E children.And that's it. */}
        {
            expanded && <div className="p-2 border-t">
            {children}
           </div>
        }
{/*Finally, there is a conditional rendering block that checks if expanded is true. If it is, a div element with the class names "p-2 border-t" is rendered, containing the children prop content*/}
        </div>
);
}

export  default ExpandablePanel;