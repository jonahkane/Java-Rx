import React, { useState } from "react";
import Axios from "axios";
import { Image } from "cloudinary-react";

function DrinkImageUpload() {
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ggaaesp5");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dtrmeorgv/image/upload",
      formData
    ).then((response) => {
      console.log(response);
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageSelected(event.target.image[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>
      <Image
        style={{ width: 200 }}
        cloudName="dtrmeorgv"
        publicId="https://res.cloudinary.com/dtrmeorgv/image/upload/v1684729237/Cappuccino_bz4gia.jpg"
      />
    </div>
  );
}

export default DrinkImageUpload;
