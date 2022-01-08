import React, { useRef, useState, useEffect } from "react";

import { Container, ImageContainer, ImagePreview } from "./styles";
import Button from "./../Button";

const ImageUpload = ({ id, onInput, errorText }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Container className='form-control'>
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <ImageContainer>
        <ImagePreview>
          {previewUrl && <img src={previewUrl} alt='Preview' />}
          {!previewUrl && <p>Please pick an image.</p>}
        </ImagePreview>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </ImageContainer>
      {!isValid && <p>{errorText}</p>}
    </Container>
  );
};

export default ImageUpload;
