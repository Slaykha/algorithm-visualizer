import React, { useEffect, useRef, useState } from 'react'
import "../assets/style/customSelect.css"

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
export const CustomSelect = (props) => {
  const {
    labelText = "Select",
    type = "classic",
    h = 20,
    w = 50,
    textColor = "black",
    customColor = "cornsilk",
    textSize = 16,
    selectedOption = -1,
    options = [{id: -1, value: "Please Select"}],
    change = () => {}
  } = props;

  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const handleSelectClick = () => {
    setIsSelectBoxOpen(!isSelectBoxOpen);
  }

  const handleSelectOption = (option) => {
    // handleOptionChange(option);
    setIsSelectBoxOpen(false);
  }

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsSelectBoxOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className={`customSelectContainer ${isSelectBoxOpen ? "active" : "passive"}`} ref={dropdownRef}>
      <label htmlFor="selectBox" className="selectLabel">{labelText}</label>
      <div className="customSelect">
        <div>{options.find(item => item.id === selectedOption).value}</div>
      </div>
      <div className="custom-select-options">
        {options.length !== 0 && options.map((option) => (
          option.id !== null &&
            <div key={option.id} className={`custom-option ${selectedOption === option.id ? "selected-option" : ""}`} onClick={change}>
              {option.value}
            </div>
        ))}
    </div>
    </div>
  )
}
