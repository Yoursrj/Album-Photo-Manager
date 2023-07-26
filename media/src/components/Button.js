import className from 'classnames';
//The code imports the className function from the classnames library. 
//This function is used to conditionally apply CSS classes based on certain conditions.
import {GoSync} from 'react-icons/go';
//It also imports the GoSync component from the react-icons/go module.
//This component represents an icon and will be used to display a spinning animation when the button is in a loading state.
function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  loading,
  ...rest
})
//The code defines a functional component called Button. It receives multiple props, including children, primary, secondary, success, warning, danger, outline, rounded, loading, and ...rest.
//The children prop represents the content inside the button element, and the other props represent different variations and states of the button.
{
  const classes = className(//The code creates a variable classes that will hold the CSS classes to be applied to the button element. It uses the className function imported earlier.
//The className function takes multiple arguments. The first argument is rest.className, which represents any additional classes passed to the Button component.
//These classes will be merged with the other classes defined in the second argument and the third argument (an object containing conditional classes).
    rest.className,//argument 1
//The second argument is a string containing the base classes for the button, such as 'flex items-center px-3 py-1.5 border h-8'.
//These classes define the button's basic layout and appearance.
    'flex items-center px-3 py-1.5 border h-8',//argument 2
//The third argument is an object that contains conditional classes based on the prop values. For example, if primary is true, the class 'border-blue-500 bg-blue-500 text-white' will be applied to the button.
//Each prop corresponds to a specific class that controls the button's appearance.
    {//argument 3
      'opacity-80':loading,
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-900 bg-gray-900 text-white': secondary,
      'border-green-500 bg-green-500 text-white': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'border-red-500 bg-red-500 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
    }
  );

  return (//The return statement renders the button element. \
//{/*The className prop is set to the classes variable, which contains the calculated CSS classes*/}
    <button {...rest} disabled={loading} className={classes}>
{/*The button element receives several props. The ...rest spread operator passes any remaining props to the button element. 
The disabled prop is set to the value of loading, which disables the button when it is in a loading state. */}  
      {/*agar loading hori ho to spinner dikhao warna nahi */}
      {loading ? <GoSync className="animate-spin"/>:children}
    </button>
//Inside the button element, there is a conditional rendering. If loading is true, it renders the GoSync component with the class "animate-spin", representing a spinning animation.
//Otherwise, it renders the children prop, which represents the content inside the button.
  );
}
//This code sets the propTypes property for the Button component. It defines a custom validation function called checkVariationValue.
Button.propTypes = {
//The checkVariationValue function receives the props primary, secondary, success, warning, and danger.
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
//Inside the function, it checks the number of props that are true using the !! double negation operator to convert the values to boolean. It sums up the count using Number().
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);

    if (count > 1) {
//If the count is greater than 1, it throws an error indicating that only one of the variation props (primary, secondary, success, warning, danger) can be true.
      return new Error(
        'Only one of primary, secondary, success, warning, danger can be true'
      );
    }
  },
};

export default Button;
//The code exports the Button component as the default export, making it available for other modules to import and use.
