import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { useFonts, Karla_400Regular, Karla_700Bold, Karla_800ExtraBold } from '@expo-google-fonts/karla'
import { NativeBaseProvider } from 'native-base'
import { Loading } from '@components/Loading'
import { THEME } from './src/theme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Routes } from '@routes/index'
import { AuthContextProvider } from '@contexts/AuthContext'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/lib/ReactQuery'
import { MyAdsContextProvider } from '@contexts/MyAdsContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
    Karla_800ExtraBold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <QueryClientProvider client={queryClient}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>  
            <AuthContextProvider>
              <MyAdsContextProvider>
                {fontsLoaded ? <Routes /> : <Loading/>}
              </MyAdsContextProvider>
            </AuthContextProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </NativeBaseProvider>
  )
}

