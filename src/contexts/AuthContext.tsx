import {CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {
  AuthUser,
  getCurrentUser,
  fetchUserAttributes,
  FetchUserAttributesOutput,
  signOut,
} from 'aws-amplify/auth';
import {Hub} from 'aws-amplify/utils';
import {
  Dispatch,
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import {HubCallback} from '@aws-amplify/core';
import {useMutation, useQuery} from '@apollo/client';
import {createUser, getUser} from './queries';
import {
  CreateUserInput,
  CreateUserMutation,
  CreateUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from '../API';

type UserType = AuthUser | null | undefined;
type UserAttributesType = FetchUserAttributesOutput | null | undefined;

type AuthContextType = {
  user: UserType;
  userAttributes: UserAttributesType;
  userId: string;
  checkUser: () => Promise<void>;
  handleSignOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  userAttributes: undefined,
  userId: '',
  checkUser: async () => {},
  handleSignOut: async () => {},
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>(undefined);
  const [userAttributes, setUserAttributes] = useState<UserAttributesType>();

  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {variables: {id: userAttributes?.sub || ''}},
  );

  const [doCreateUser] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(createUser);

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  const checkUser = async () => {
    try {
      const authUser = await getCurrentUser();
      const authUserAttributes = await fetchUserAttributes();

      console.log('authUser', authUser);
      console.log('authUserAttributes', authUserAttributes);

      setUser(authUser);
      setUserAttributes(authUserAttributes);
    } catch (e) {
      setUser(null);
    }
  };

  const createNewUser = async () => {
    console.log('create new user triggered');

    if (!userAttributes) {
      console.log('no user Attributes');
      return;
    }
    const input: CreateUserInput = {
      id: userAttributes?.sub,
      name: userAttributes?.name,
    };
    try {
      const response = await doCreateUser({
        variables: {
          input,
        },
      });

      console.log('new user created');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(data?.getUser);
    if (!data?.getUser) {
      createNewUser();
    }
  }, [userAttributes]);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      //   console.log(data);

      const {event} = data.payload;
      if (event === 'signOut') {
        setUser(null);
      }
      if (event === 'signIn') {
        checkUser();
      }
    };
    const listenerHandle = Hub.listen('auth', listener);

    // In your component's cleanup function (e.g., useEffect cleanup)
    return () => {
      // Remove the listener using the listenerHandle
      listenerHandle();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userAttributes,
        userId: user?.userId || '',
        checkUser,
        handleSignOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
