import { Stack } from "expo-router"


export default function HomeLayout (){
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerTitle:'Be My Eyes',headerTransparent:true,headerTitleAlign:'center',headerLeft:()=>(<></>),gestureEnabled:false,}}/>
        </Stack>
    )
}