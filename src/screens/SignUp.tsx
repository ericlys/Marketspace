import { Box, Center, Heading, Icon, IconButton, Image, ScrollView, Text, VStack } from "native-base";
import { UserPhoto } from "@components/UserPhoto";
import LogoPng from '@assets/logo.png';
import userPhotoPng from '@assets/userPhotoDefault.png';
import { PencilLine, PencilSimple, PencilSimpleLine } from "phosphor-react-native";
import { Pressable } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";


export function SignUp() {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <VStack flex={1} alignItems="center" bg="gray.200" p="12">
      <Image 
        source={LogoPng} 
        alt="Logo do app"
        w={16}
        h={12}
        resizeMode="contain" 
      />
      <Heading
        fontFamily="heading"
        fontSize="lg"
        color="gray.700"
        mt={4}
      >
        Boas vindas!
      </Heading>

      <Text
        textAlign="center"
        maxW="72"
        mt="2"
      >
        Crie sua conta e use o espaço para comprar itens variados e 
        vender seus produtos
      </Text>

      <Box>
        <UserPhoto
          size={24}
          source={userPhotoPng}
          alt="profile user photo"
          mt="8"
        />

        <IconButton
          icon={
            <PencilSimpleLine
            size={16}
            color="white"
            />
          }
          bg="blue.400"
          p="3"
          rounded="full"
          position="absolute"
          bottom="0"
          right="0"
          _pressed={{
            bg: 'blue.500'
          }}
          />
      </Box>

      <Input
        placeholder="Nome"
        mt={4}
      />
      <Input
        placeholder="E-mail"
      />
      <Input
        placeholder="Telefone"
      />
      <Input
        placeholder="Senha"
        secureTextEntry
      />
      <Input
        placeholder="Confirmar senha"
        secureTextEntry
      />

      <Button
        title="Criar"
        variant="primary"
        mt={2}
      />

      <Center w="full" mt={12}>
        <Text>
          Já tem uma conta?
        </Text>

        <Button 
          title="Ir para o login"
          variant="tertiary"
          mt={4}
        />
      </Center>

      </VStack>
    </ScrollView>
  )
}