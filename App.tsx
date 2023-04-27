import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { useFonts, Karla_400Regular, Karla_700Bold, Karla_800ExtraBold } from '@expo-google-fonts/karla'
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AdDetails } from '@screens/Advertisement/AdDetails';

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
    Karla_800ExtraBold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          {fontsLoaded ? <AdDetails /> : <Loading/>}
        </GestureHandlerRootView>

    </NativeBaseProvider>
  );
}

