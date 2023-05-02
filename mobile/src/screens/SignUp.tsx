import { Box, Center, Heading, IconButton, Image, ScrollView, Skeleton, Text, VStack, useToast } from "native-base"
import { PencilSimpleLine } from "phosphor-react-native"
import { useNavigation } from "@react-navigation/native"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import * as ImagePicker from "expo-image-picker"
import * as FileSystem from 'expo-file-system'

import LogoPng from '@assets/logo.png'
import userPhotoPng from '@assets/userPhotoDefault.png'

import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useState } from "react"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"

type FormDataProps = {
  name: string
  email: string
  tel: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
  tel: yup.string().required('Informe o telefone.'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve conter pelo menos 6 dígitos.'),
  password_confirm: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As confirmação da senha não confere')
})

export function SignUp() {
  const navigation = useNavigation()
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [avatarUri, setAvatarUri] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  function handleGoBack() {
    navigation.goBack()
  }

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  })

  async function handleUserPhotoSelect(){
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4,4],
        allowsEditing: true,
        // base64: true
      })
      
      if(photoSelected.canceled) {
        return
      }

      if(photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
        
        if(photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5){
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: 'top',
            bgColor: 'red.500'
          })          
        }

        setAvatarUri(photoSelected.assets[0].uri)
        
      }
      
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleSignUp({ name, email, tel, password }:FormDataProps) {
    setIsLoading(true)

    if(!avatarUri) {
      toast.show({
        title: 'É obrigatório o envio de uma imagem!',
        placement: 'top',
        bgColor: 'red.400'
      })
      
      return 
    }

    const fileExtension = avatarUri.split('.').pop()

    const avatar = {
      name: `${name}.${fileExtension}`.toLowerCase().replace(/\s/g,''),
      uri: avatarUri,
      type: `image/${fileExtension}`
    } as any

    try {
      const signUpForm = new FormData()
      signUpForm.append('name', name)
      signUpForm.append('email', email)
      signUpForm.append('tel', tel)
      signUpForm.append('password', password)
      signUpForm.append('avatar', avatar)
  
      await api.post('/users', signUpForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      toast.show({
        title: 'Conta criada com sucesso.',
        placement: 'top',
        bgColor: 'blue.500'
      })

      handleGoBack()

    } catch (error) {      
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.'

      if(isAppError) {
        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.500'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

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
        <Skeleton 
          isLoaded={!photoIsLoading}
          w={24}
          h={24} 
          rounded="full"
          startColor="gray.400"
          endColor="gray.300"
          >
            <UserPhoto
              size={24}
              source={avatarUri ? { uri: avatarUri } : userPhotoPng}
              alt="profile user photo"
              mt="8"
            />
        </Skeleton>

        <IconButton
          onPress={handleUserPhotoSelect}
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

      <Controller
        control={control}
        name="name"
        render={({ field: {onChange, value} }) => (
          <Input
            placeholder="Nome"
            mt={4}
            errorMessage={errors.name?.message}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }}) => (
          <Input 
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            errorMessage={errors.email?.message}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="tel"
        render={({ field: { onChange, value }}) => (
          <Input 
            placeholder="Telefone"
            keyboardType="numeric"
            autoCapitalize="none"
            errorMessage={errors.tel?.message}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }}) => (
          <Input 
            placeholder="Senha"
            secureTextEntry
            errorMessage={errors.password?.message}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

     <Controller
      control={control}
      name="password_confirm"
      render={({ field: { onChange, value }}) => (
        <Input 
          placeholder="Confirmar senha"
          secureTextEntry
          onChangeText={onChange}
          value={value}
          errorMessage={errors.password_confirm?.message}
          onSubmitEditing={handleSubmit(handleSignUp)}
          returnKeyType="send"
        />
      )}
    />

      <Button
        title="Criar"
        variant="primary"
        mt={2}
        onPress={handleSubmit(handleSignUp)}
        isLoading={isLoading}
      />

      <Center w="full" mt={12}>
        <Text>
          Já tem uma conta?
        </Text>

        <Button 
          title="Ir para o login"
          variant="tertiary"
          mt={4}
          onPress={handleGoBack}
        />
      </Center>

      </VStack>
    </ScrollView>
  )
}