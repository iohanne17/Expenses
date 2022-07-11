import React, {createContext, useCallback, useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Loading} from '@Components/usefulComponents';

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
}

const AppProvider = ({children}: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setuserToken] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<any>();

  // bootstrap method to check if the user is authenticated
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

  // useEffect to initially trigger this
  useEffect(() => {
    bootStrapAsync();
  }, [bootStrapAsync]);

  // Memo object that will be updated everytime the context changes
  const authContext: AuthContextProps = {
    reload: bootStrapAsync,
    isAuthenticated,
    isLoading,
    userToken,
    userData,
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
