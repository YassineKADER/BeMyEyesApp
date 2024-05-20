import api from "@/constants/api"
import * as FileSystem from "expo-file-system"

export async function ocrApi(imageUri: string | undefined) {
  const apiUrl = api.API_URL + "/v1/api/imagenet"; // replace with your server URL
  fetch(api.API_URL).then(res => res.text()).then(r => console.log(r))
  console.log(apiUrl)
  if (imageUri) {
    let formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg'
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    fetch(apiUrl, options)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        return text;
      })
      .catch((error) => {
        console.error("error here:" + error);
      });
  }
}
