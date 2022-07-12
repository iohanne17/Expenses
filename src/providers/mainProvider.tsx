import React, {createContext, useCallback, useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Loading} from '@Components/usefulComponents';
import '../assets/translators/i18n';
import {useTranslation} from 'react-i18next';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const AuthContext = createContext<unknown>(undefined);

interface Props {
  children?: any;
}

interface AuthContextProps {
  reload: () => void;
  isAuthenticated: boolean | undefined;
  isLoading: boolean;
  userToken: string | undefined;
  userData: any;
  currentLanguage: string;
  changeLanguage: (a: any) => void;
  t: any;
  i18n: any;
}

const AppProvider = ({children}: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setuserToken] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<any>();
  const {t, i18n} = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');
  const changeLanguage = (value: string) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  /* A function that is called when the app is first loaded to check if the user is authenticated and
retrieve the user data from async storage. */
  const bootStrapAsync = useCallback(async () => {
    setIsLoading(true);
    try {
      ///check if user is authenticated retrieve token from async storage here, fetch the user data for use in any page
      //;mimicking fething user data
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
        setuserToken('absc');
        setUserData({});
      }, 3000);
    } catch (err) {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  /* A callback function that is called to send the token rempte server */
  const registerPushNotification = useCallback((fcmToken: string) => {
    console.log('I AM THE TOKEN', fcmToken);
  }, []);

  // useEffect to initially trigger this
  useEffect(() => {
    bootStrapAsync();
  }, [bootStrapAsync]);

  // Firebase connection
  useEffect(() => {
    const registerFirebase = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        messaging()
          .getToken()
          .then(token => registerPushNotification(token));
      }
    };

    registerFirebase();

    return messaging().onTokenRefresh(
      token => {
        console.log('fcm token response', token);
      },
      //on token refresh register again
    );
  }, [registerPushNotification]);

  //Handle notification when app on foreground
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async message => {
      console.log('===>', {message});
      Alert.alert('i am here i triggeered a push');
    });
    return unsubscribe;
  }, []);

  // Background message on app opened
  useEffect(() => {
    messaging().onNotificationOpenedApp(message => {
      console.log('Notification just opened this message', {
        message,
      });
    });

    messaging()
      .getInitialNotification()
      .then(message => {
        console.log('message--->', message);
      });
  }, []);

  // Memo object that will be updated everytime the context changes
  const authContext: AuthContextProps = {
    reload: bootStrapAsync,
    isAuthenticated,
    isLoading,
    userToken,
    userData,
    currentLanguage,
    changeLanguage,
    t,
    i18n,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        {children({
          isAuthenticated,
        })}
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
};

export {AuthContext, AppProvider};
