import { Button } from "@components/Button"
import { Slide } from "@components/Slide"
import { Trade } from "@components/Trade"
import { UserPhoto } from "@components/UserPhoto"
import { ProductDTO } from "@dtos/ProductDTO"
import { useNavigation } from "@react-navigation/native"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { formatCurrency } from "@utils/formatters"
import { Box, Center, HStack, Heading, ScrollView, Text, VStack, useToast } from "native-base"
import { useState } from "react"

type Props = {
  isEditable?: boolean
  product: ProductDTO
  user: {
    avatar: string
    name: string
    tel: string
  }
}

export function AdView({product, user, isEditable=false}: Props) {
  const [ isLoading, setIsLoading ] = useState(false)
  const toast = useToast()
  const navigation = useNavigation()

  function goBack() {
    navigation.goBack()
  }

  const formattedImagesPaths = product.product_images.map( image => 
    image.path.includes("file:") ?
    image.path :
    `${api.getUri()}/images/${image.path}`
  )

  async function handleActiveOrDeactivateProduct() {
    try {
      setIsLoading(true)
      await api.patch(`/products/${product.id}`, {is_active: !product.is_active})
      
      product.is_active = !product.is_active
  
    }catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi alterar o estado do produto.';
  
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  
  }

  async function handleDeleteAdsProduct() {
    try {
      setIsLoading(true)
      await api.delete(`/products/${product.id}`)

      toast.show({
        title: 'Anúncio excluído.',
        placement: 'top',
        bgColor: 'blue.500'
      })

      goBack()
  
    }catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Houve um erro ao tentar deletar o produto, tente novamente mais tarde.';
  
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box>
        <Slide images={formattedImagesPaths} position="relative"/>
        {
          !product.is_active &&
          <Center 
            position={"absolute"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(51, 52, 53, 0.5)" 
          >
            <Text
              textTransform="uppercase"
              color="gray.100"
              fontFamily="heading"
              fontSize="sm"
            >
              Anúncio desativado
            </Text>
          </Center>
        }
      </Box>

      <VStack my={5} mx={6}>
        <HStack alignItems="center">
          <UserPhoto
            source={{ uri: `${api.getUri()}/images/${user.avatar}`}}
            alt="Imagem do perfil do vendedor"
            size={6}
            borderWidth={2}
            mr={2}
          />
          <Text fontSize="sm">
            {user.name}
          </Text>
        </HStack>

        <Text
          mt={27}
          bg="gray.300"
          color="gray.600"
          fontFamily="heading"
          textTransform="uppercase"
          alignSelf="flex-start"
          fontSize="xxs"
          px={2}
          py={0.5}
          rounded="full"
        >
          {product.is_new ? 'novo' : 'usado'}
        </Text>

        <HStack mt={2.5} alignItems="center" justifyContent="space-between">
          <Heading fontFamily="heading" fontSize="lg" maxW="75%">
            {product.name}
          </Heading>

          <HStack alignItems="baseline">
            <Text color="blue.400" fontSize="sm" fontFamily="heading">
              R$
            </Text>
            <Text color="blue.400" fontSize="lg" fontFamily="heading">
              {formatCurrency(product.price.toString())}
            </Text>
          </HStack>
        </HStack>

        <Text mt={2} fontSize="sm" lineHeight={18.2} color="gray.600">
          {product.description}
        </Text>

        <HStack mt={6} alignItems="baseline">
          <Text color="gray.600" fontFamily="heading" fontSize="sm" mr={2}>
            Aceita troca?
          </Text>
          <Text mt={2} fontSize="sm" color="gray.600">
            {product.accept_trade ? 'Sim' : 'Não'}
          </Text>
        </HStack>

        <Box>
          <Text
            color="gray.600"
            fontFamily="heading"
            fontSize="sm"
            mt={4}
            mb={2}
          >
            Meios de pagamento:
          </Text>

          { product.payment_methods.map( method => (
            <Trade key={method} type={method} />
          ))
          }
        </Box>

        {isEditable &&    
          <VStack mt={8} space={2}>
            <Button
              title={product.is_active ? "Desativar anúncio" : "Reativar anúncio"}
              icon="Power"
              variant={product.is_active ? "primary" : "secondary"}
              isLoading={isLoading}
              onPress={handleActiveOrDeactivateProduct}
            />
            <Button
              title="Excluir anúncio"
              icon="Trash"
              variant="tertiary"
              onPress={handleDeleteAdsProduct}
              isLoading={isLoading}
            />
          </VStack>
        }

      </VStack>
    </ScrollView>
  );
}
