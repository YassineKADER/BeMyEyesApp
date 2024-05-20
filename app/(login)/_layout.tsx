import { Stack } from "expo-router"


export default function HomeLayout (){
    return (
        <Stack>
            <Stack.Screen name="login" options={{headerTitle:'SignIn',headerTransparent:true,headerTitleAlign:'center',headerLeft:()=>null}}/>
            <Stack.Screen name="signup" options={{headerTitle:'SignUp',headerTransparent:true,headerTitleAlign:'center',headerLeft:()=>null}}/>
        </Stack>
    )
}