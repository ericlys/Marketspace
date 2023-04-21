import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla'
import { NativeBaseProvider } from 'native-base';

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold
  })

  return (
    <NativeBaseProvider>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
        />
      {fontsLoaded ? <View/> : <View>Loading ...</View>}
    </NativeBaseProvider>
  );
}

