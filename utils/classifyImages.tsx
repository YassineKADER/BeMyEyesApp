import api from "@/constants/api"
import * as FileSystem from "expo-file-system"

// export async function classifyImageApi(imageUri: string | undefined) {
//   let apiUrl = api.API_URL + "/v1/api/imagenet"; // replace with your server URL
//   if (imageUri) {
//     let data = await FileSystem.readAsStringAsync(imageUri);
//
//     let options = {
//       method: 'POST',
//       body: data,
//       headers: {
//         'Content-Type': "image/jpeg",
//       },
//     };
//
//     return fetch(apiUrl, options)
//       .then((response) => response.text())
//       .then((text) => {
//         console.log(text);
//         return text;
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// }

export async function classifyImageApi(imageUri: string | undefined) {
  const apiUrl = api.API_URL + "/v1/api/imagenet"; // replace with your server URL
  fetch(api.API_URL).then(res => res.text()).then(r => console.log(r))
  console.log(apiUrl)
  if (imageUri) {
    let response = await fetch(imageUri);
    let blob = await response.blob();

    let formData = new FormData();
    formData.append('image', blob);

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
