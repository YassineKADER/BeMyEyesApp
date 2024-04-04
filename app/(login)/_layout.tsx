import { Stack } from "expo-router"


export default function HomeLayout (){
    return (
        <Stack>
            #TODO Add also the thing related to signup Stack
            <Stack.Screen name="index" options={{headerTitle:'SignIn',headerTransparent:true,headerTitleAlign:'center',headerLeft:()=>null}}/>
        </Stack>
    )
}