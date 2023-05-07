import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HStack, IconButton, Text, VStack, useTheme, useToast } from "native-base";
import { AdView } from "./components/AdView";
import { PencilSimpleLine } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useEffect, useState } from "react";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  id: string,
  isEditable?: boolean
}

export function AdDetails() {
  const theme = useTheme()
  const toast = useToast()

  const [ isLoading, setIsLoading ] = useState(true)
  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const [ product, setProduct ] = useState({} as ProductDTO)

  const route = useRoute()
  const { id, isEditable } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchProductDetails() {
    try {
      setIsLoading(true)
      const response = await api.get(`/products/${id}`)

      const payment_methods = response.data.payment_methods.map((method: { key: string }) => method.key)

      setProduct({...response.data, payment_methods})
  
    }catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do produto.';
  
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEditProductAds() {
    navigation.navigate("createAds", {productEditable: product})
  }

  useEffect(() => {
    fetchProductDetails()
  },[id])


  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.gray[100] }} >
    <VStack flex={1} bg="gray.200">
      {!!isEditable ? (
        <Header 
          pt={2}
          onBack={handleGoBack} 
          rightIcon={
            <IconButton
              onPress={handleEditProductAds}
              icon={
                <PencilSimpleLine
                  size={24}
                  color={theme.colors.gray[700]}
                />
              }
              rounded="full"
              _pressed={{
              bg: 'gray.300'
            }}
           />
         }
       />
        )
        :
        (
          <Header onBack={handleGoBack}/>
        )     
      }

      { isLoading ?
        <Loading/> 
       :
        <AdView product={product} user={product.user!} isEditable={isEditable}/>
      }

      {!isEditable && 
        <HStack bg="gray.100" py={25.5} px={6} alignItems="center" justifyContent="space-between">
        <HStack alignItems="baseline">
          <Text 
            color="blue.500" 
            fontSize="sm" 
            fontFamily="heading"
            mr="1"
          >
            R$
          </Text>
          <Text color="blue.500" fontSize="xl" fontFamily="heading">
            213,00
          </Text>
        </HStack>

        <Button
          w="auto"
          icon="WhatsappLogo"
          iconWeight="fill"
          title="Entrar em contato"
        />
        </HStack>
      }
    </VStack>
  </SafeAreaView>
  )
}
