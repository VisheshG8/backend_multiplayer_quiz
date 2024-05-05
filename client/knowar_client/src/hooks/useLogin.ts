import {apiUrl} from '../constants/constants';
import {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {AuthContext} from '../store/auth-context';
import {
  AuthenticatedScreens,
  RootStackParamList,
  UnauthenticatedScreens,
} from '../types/navigation';
import * as KeychainService from '../services/KeychainService';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  UnauthenticatedScreens.LoginScreen
>;

export function useLogin(email: string, password: string) {
  const navigation = useNavigation<LoginNavigationProp>();

  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/login-user`,
        {email, password},
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application.json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );

      const data = await response.data;

      if (data.status === 'ok') {
        const {token, email, userName, userId} = data.data;
        authCtx.authenticate(token, email, userName, userId);

        const keychainData = {token, userName, userId};
        await KeychainService.setCredentials(email, keychainData);
        navigation.replace(AuthenticatedScreens.MainMenuScreen);
      } else {
        Alert.alert('Login Failed', 'Invalid Credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {loginHandler, isLoading};
}
