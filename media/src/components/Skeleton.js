//We're going to make a new component called a skeleton loader.
//A skeleton loader means that we're going to show some gray boxes on the screen that are kind of meant to serve as a stand in for the actual content that is about to be displayed.
//So while we are loading data, we're going to show the skeleton loader, which is going to be the set of gray boxes right here.
//And then when we eventually get our list of users, we will actually render the list of users and display them as usual.
//Now, to really understand what this skeleton loader is all about, let me give you a quick demonstration, because I guarantee you, you have seen this thing online at some point in time before.
//So here's a quick demo of what we want.We want something like this.
import classNames from "classnames";//This line imports the classNames utility from the classnames library. It is used to conditionally concatenate and generate class names.
//I will then create my component.And export it at the bottomNow, as props to this, I'm going to receive a prop called Times.Times is going to be a number.
//So this is going to be how many gray boxes I want to show on the screen.So if we pass in a times of one, that means I want to show one of these gray boxes with the shimmer effect on it.
//If I pass it in times of four, I want to show something like this.So again, just a little convenience thing to allow ourselves to reuse the skeleton loader several times inside this application.

function Skeleton({times,className}){
//This line declares a functional component named Skeleton that accepts two props: times (a number indicating the number of skeleton boxes to render) and className (optional additional class names for customization).
    const outerClassNames = classNames(
//This line creates a variable outerClassNames using the classNames utility. It concatenates the provided class names with some predefined class names (relative, overflow-hidden, bg-gray-200, rounded, and mb-2.5).

    //Quick explanation here relative is going to allow us to position the inner element.Absolutely.
    //Overflow hidden is what's going to hide the inner element if they are not overlapping BG gray, 200 background rounded corners and a little bit of margin on the bottom.
    //Next up for inter class names.This one does have several more strings than the first one, each of which are very, very special.So again, please triple check your spelling.
    //We'll put in animates Shimmer.So that's going to be what applies.That little animation we put together.Just a moment to go.
        'relative',
        'overflow-hidden',
        'bg-gray-200',
        'rounded',
        'mb-2.5',
        className
    );
//This line creates a variable innerClassNames using the classNames utility. 
//It concatenates the provided class names with some predefined class names 
//(animate-shimmer, absolute, inset-0, -translate-x-full, bg-gradient-to-r, from-gray-200, via-white, and to-gray-200).
    const innerClassNames = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full',
        'bg-gradient-to-r',
        'from-gray-200',
        'via-white',
        'to-gray-200'

    );
//So our goal right now is to take this number and somehow generate a list of boxes out of it.We could use a simple for loop for that, so I could make a variable right here called boxes.
//And we could say for.Let I equal to zero I less than times I plus plus.Boxes dot push, and then I can put in some divs with a key of whatever that I variable is.
//And then we could return boxes down here like so this is one way to do it.
const boxes  = [];
//This code block initializes an empty array called boxes. It then loops times number of times and pushes a JSX element into the boxes array for each iteration.
for (let i=0 ; i<times ; i++){
    boxes.push(
    //So this outer div is the one that's going to stay in place.This is the one that is going to be that kind of black box right here.
    //And then the inner div is going to be this one with the gradient that moves around a whole bunch. So outer div stays steady.Inner div, that's the one that's going to move around
    //.Both these divs are going to get a ton of different class names.So we're going to create two variables up here.Called outer class names.And inner class names.
    //I'm going to assign our class names as the set of class names for the outer div.So I'll put in class names of outer class names.And on the inner div.Yep, you guessed it, inner class names.
    //Now we are just creating these variables ahead of time so we can write out all the class names and you can see them on the screen very easily.
    //We could just as well write out a ton of class names right here.But it would just be really hard to read.So that's why I'm doing these things ahead of time.
    
//The JSX element represents a single skeleton box, consisting of an outer div (with outerClassNames) and an inner div (with innerClassNames).    
    <div key={i} className={outerClassNames}>{/*Each skeleton box is given a unique key prop based on the iteration index (i).*/}
    <div className={innerClassNames}/>
    </div>
    )
}
return boxes//Finally, the boxes array is returned.
}

export  default  Skeleton;