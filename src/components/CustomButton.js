import React from 'react'
import "../assets/style/button.css"

/**
 * CustomButton is a sample React button component.
 *
 * @component
 * @example
 * // Usage example:
 * <CustomButton
 *   text="Click Me!"
 *   type="classic"
 *   h={20}
 *   w={50}
 *   textColor="black"
 *   customColor="cornsilk"
 *   textSize={16}
 *   click={() => {}}
 * />
 *
 * @param {string} [props.text] - The text of the button. (optional)
 * @param {string} [props.type] - The type of the button. (optional)
 * @param {number} [props.h] - The height of the button. (optional)
 * @param {number} [props.w] - The width of the button. (optional)
 * @param {string} [props.textColor] - The color of the button text. (optional)
 * @param {string} [props.customColor] - The color of the button. (optional)
 * @param {number} [props.textSize] - The font size of the button text. (optional)
 * @param {function} [props.click] - The function that will execute when button clicked. (optional)
 * @returns {JSX.Element} - The rendered JSX element.
 */
export const CustomButton = (props) => {
  const {
    text = "button",
    type = "classic",
    h = 20,
    w = 50,
    textColor = "black",
    customColor = "cornsilk",
    textSize = 16,
    click = () => {}
  } = props;

  return (
    <div className="customButtonContainer">
      <div 
        className={`customButton ${type}`} style={{height: h + "px", width: w + "px", color: textColor, backgroundColor: customColor, fontSize: textSize + "px"}}
        onClick={click}
      >
        {text}
      </div>
    </div>
  )
}
