import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Auth,API,graphqlOperation } from "aws-amplify";
import {getUser} from './src/graphql/queries';
import {createUser} from './src/graphql/mutations';

import { withAuthenticator } from "aws-amplify-react-native";

import Amplify from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

const randomImages = [
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.png'
]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
return randomImages[Math.floor(Math.random()*randomImages.length)];
  }

  //run this snippet only when app is first mounted
  useEffect(() => {
    const fetchUser = async () => {
      //get authenticatesd user from auth
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      
      if (userInfo) {
        //get the user from backend with the user SUB from auth
        const userData = await API.graphql(graphqlOperation(getUser,{id: userInfo.attributes.sub}));

        if(userData.data.getUser){
          console.log('user is already registered in database');
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'Hey, I am using WhatsApp'
        };
        console.log(newUser); 
        await API.graphql(
          graphqlOperation(
            createUser,{
              input: newUser
            }
          )
        );
        // if there is no user in DB with the id, then create one
      }
    };
    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
