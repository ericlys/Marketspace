import { StatusBar } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold, Karla_800ExtraBold } from '@expo-google-fonts/karla'
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { Details } from '@screens/Details';

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
      {fontsLoaded ? <Details /> : <Loading/>}
    </NativeBaseProvider>
  );
}

