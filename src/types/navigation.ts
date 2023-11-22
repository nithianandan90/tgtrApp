import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: {id: string};
  Users: undefined;
  NotFound: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  TabOne: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  Profile: undefined;
  Chat: undefined;
  CreatePost: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ChatStackNavigatorParamList = {
  Chat: undefined;
  ChatRoom: undefined;
};

export type ChatNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'Chat'
>;

export type CreateNavigationProp = NativeStackNavigationProp<
  RootTabParamList,
  'CreatePost'
>;
