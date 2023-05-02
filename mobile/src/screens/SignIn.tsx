import { Center, Image, Text, VStack, useToast } from "native-base"
import LogoPng from '@assets/logo.png'
import AppName from '@assets/marketspace.png'

import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { useAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"

type FormDataProps = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve conter pelo menos 6 dígitos.')
})


export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()
  const toast = useToast()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  const { control, handleSubmit, formState: { errors, isLoading } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  })

  async function handleSignIn({email, password}: FormDataProps) {
    try {
      
      await signIn(email, password)

    } catch (err) {
      const isAppError = err instanceof AppError
      const title = isAppError ? err.message : 'Não foi possível entrar. Tente novamente mais tarde.'
    
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      
    }     
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
            style={{
              textShadowColor: 'rgba(0, 0, 0, 0.25)',
              textShadowOffset: { width: 0, height: 4 },
              textShadowRadius: 4,  
            }}
          >
            Acesse sua conta
          </Text>

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
            name="password"
            render={({ field: { onChange, value }}) => (
              <Input 
                placeholder="Senha"
                type="password"
                autoCapitalize="none"
                secureTextEntry
                errorMessage={errors.password?.message}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Button 
            title="Entrar"
            isLoading={isLoading}
            onPress={handleSubmit(handleSignIn)}
          />
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