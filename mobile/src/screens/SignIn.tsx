import { Center, Image, Text, VStack } from "native-base";
import LogoPng from '@assets/logo.png';
import AppName from '@assets/marketspace.png';
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();


  function handleNewAccount() {
    navigation.navigate('signUp')
  }


  return (
    <VStack flex={1} bg="gray.100">
      <Center flex={1} bg="gray.200" px={12} borderBottomRadius="3xl">
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

        <Center w="full">
        <Text 
          fontFamily="body"
          color="gray.600"
          fontSize="sm"
          mt={20}
          mb={4}
        >
          Acesse sua conta
        </Text>

          <Input 
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input 
            placeholder="Senha"
            type="password"
            secureTextEntry={true}
            autoCapitalize="none"
          />

          <Button title="Entrar" />
        </Center>
      </Center>


      <Center w="full" bg="gray.100" px={12} mb={16} mt="12">
        <Text
          color="gray.600"
          fontSize="sm"
        >
          Ainda não tem acesso?
        </Text>

        <Button 
          title="Criar uma conta" 
          variant="tertiary" 
          mt={4}
          onPress={handleNewAccount}
        />
      </Center>
    </VStack>
  )
}