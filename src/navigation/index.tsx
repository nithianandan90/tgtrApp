import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types/navigation';

import ChatsScreen from '../screens/Chats/ChatsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatStackNavigator from './ChatStackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CreateEventScreen from '../screens/CreateEventScreen/CreateEventScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ChatContextProvider from '../contexts/ChatContext';

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName="TabOne">
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        options={{
          headerTitle: 'All Volunteer Events',
          title: 'Events',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="event" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons name="chatbox-ellipses-outline" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="CreatePost"
        component={CreateEventScreen}
        options={{
          title: 'Create Event',
          tabBarIcon: ({color}) => (
            <Ionicons name="add" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({color}) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

let stackScreens = (
  <>
    <Stack.Screen
      name="Home"
      component={BottomTabNavigator}
      options={{headerShown: false}}
    />
  </>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>{stackScreens}</Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
