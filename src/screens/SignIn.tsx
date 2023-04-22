import { Image, Text, VStack } from "native-base";
import LogoPng from '@assets/logo.png';
import AppName from '@assets/marketspace.png';

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.100">
      <VStack flex={1} alignItems="center" justifyContent="center" bg="gray.200" px={12}>
        <Image 
          source={LogoPng} 
          alt="Logo do app"
          w={32}
          h={20}
          resizeMode="contain" 
        />
        <Image 
          source={AppName} 
          alt="Logo do app"
          w={56}
          mt={4}
          resizeMode="contain" 
        />
        <Text 
          fontFamily="body"
          color="gray.500"
          fontSize="sm"
        >
          seu espaço de compra e venda
        </Text>
      </VStack>
      {/* <VStack w="full" h={14} bg="gray.100">

      </VStack> */}
    </VStack>
  )
}