"use client";

import { useRef } from "react";
import classes from "./image-picker.module.css"

const ImagePicker = ({ label, name }) => {
  const ImageInputRef = useRef();
  const handlePickClick = () => {
    ImageInputRef.current.click();
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={ImageInputRef}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;