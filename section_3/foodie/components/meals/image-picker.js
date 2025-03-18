"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css"
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const [pickedImage, seetPickedImage] = useState();
  const ImageInputRef = useRef();

  const handlePickClick = () => {
    ImageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    // 선택한 첫번째 파일을 불러온다
    const file = e.target.files[0];

    // 파일이 없으면 아무것도 하지 않는다
    if (!file) {
      return ;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      // fileReader.result로 url에 접근. 이미지를 가져온다
      seetPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image picked yet.</p>}
          {pickedImage && <Image src={pickedImage} alt="picked food Image" fill/>}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={ImageInputRef}
          onChange={handleImageChange}
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