import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomBottomTab from './components/CustomBottomTab';

import ChatScreen from './pages/ChatScreen';
import Splash from './pages/Splash';
import Add from './pages/Add';
import Play from './pages/Play';
import Mypage from './pages/Mypage';
import SearchList from './pages/SearchList';
import Follower from './pages/Follower';

import Settings from './pages/Settings';
import HomeFeed from './pages/HomeFeed';
import Search from './pages/Search';

import Notice from './pages/Notice';
import NoticeDetail from './pages/NoticeDetail';
import CustomCameraRoll from './components/CustomCameraRoll';
import VideoPlayer from './pages/VideoPlayer';
import ChatList from './pages/ChatList';
import AddText from './pages/AddText';

import Signup from './pages/Signup';
import Login from './pages/Login';

import Profile from './pages/Profile';
import CreateFeed from './pages/CreateFeed';
import FeedDetailScreen from './pages/FeedDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = props => <CustomBottomTab {...props} />;

const SearchTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchList" component={SearchList} />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="홈" component={HomeFeed} />
      <Tab.Screen name="검색" component={SearchTab} />
      <Tab.Screen name="추가" component={Add} />
      <Tab.Screen name="채팅" component={ChatList} />
      <Tab.Screen name="마이페이지" component={Mypage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeFeed" component={HomeFeed} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Follower" component={Follower} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="FeedDetailScreen" component={FeedDetailScreen} />

      <Stack.Screen name="AddText" component={AddText} />
    </Stack.Navigator>
  );
};

export default Router;
