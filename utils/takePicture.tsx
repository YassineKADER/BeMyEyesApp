import { Camera, CameraType, PermissionResponse } from "expo-camera";
import React from "react";
import * as Haptics from 'expo-haptics';

export async function takePicture(camera: React.RefObject<Camera>, permission: PermissionResponse | null) {
  if (permission && permission.granted === true && camera.current) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    let pic = await camera.current.takePictureAsync({ quality: 0.25, base64: true, skipProcessing: true })
    return pic.uri;
  }
  return
}
