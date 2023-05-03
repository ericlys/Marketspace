import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { IconButton, useTheme } from 'native-base'
import { useAuth } from '@hooks/useAuth'
import { Platform } from 'react-native';
import { Home } from '@screens/Home';
import { House, SignOut, Tag } from 'phosphor-react-native';
import { UserAds } from '@screens/UserAds';

type AppRoutes = {
  home: undefined
  userAds: undefined
  logout: undefined
}

export type AppTabNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

const LogoutComponent = () => {
  return null
}

export function AppTabRoutes() {
  const { sizes, colors } = useTheme()

  const { signOut } = useAuth()

  const iconSize = sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[600],
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        backgroundColor: colors.gray[100],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: sizes[8],
        paddingTop: sizes[7]
      }
    }}>
      <Screen 
        name="home" 
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House color={color} weight={focused ? 'bold' : 'regular'}  size={iconSize} />
          )
        }}
      />
      <Screen 
        name="userAds" 
        component={UserAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag color={color} weight={focused ? 'bold' : 'regular'} size={iconSize} />
          )
        }}
      />
      <Screen 
        name="logout" 
        component={LogoutComponent}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconButton
              onPress={signOut}
              _pressed={{
                bg: 'gray.100'
              }}
              icon={
                <SignOut weight={focused ? 'bold' : 'regular'} color={colors.red[400]} size={iconSize} />
              }
            />
          )
        }}
      />
    </Navigator>
  )
}