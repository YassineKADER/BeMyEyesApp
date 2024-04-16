import { Camera, CameraType, PermissionResponse } from "expo-camera";
import React from "react";

export async function takePicture(camera: React.RefObject<Camera>, permission: PermissionResponse | null) {
    if (permission && permission.granted === true && camera.current) {
       let pic = await camera.current.takePictureAsync({quality:0.25, base64: true})
       return pic.uri; 
    }
    return
}
