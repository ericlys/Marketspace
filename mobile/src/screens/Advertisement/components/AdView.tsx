import { Button } from "@components/Button"
import { Slide } from "@components/Slide"
import { Trade } from "@components/Trade"
import { UserPhoto } from "@components/UserPhoto"
import { ProductDTO } from "@dtos/ProductDTO"
import { api } from "@services/api"
import { formatCurrency } from "@utils/formatters"
import { Box, Center, HStack, Heading, ScrollView, Text, VStack } from "native-base"

type Props = {
  isMy?: boolean
  isActive?: boolean
  product: ProductDTO
  user: {
    avatar: string
    name: string
    tel: string
  }
}

export function AdView({product, user, isMy=false, isActive=true}: Props) {

  const formattedImagesPaths = product.product_images.map( image => image.path)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box>
        <Slide images={formattedImagesPaths} position="relative"/>
        {
          !isActive &&
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

        {isMy &&    
          <VStack mt={8} space={2}>
            <Button
              title={isActive ? "Desativar anúncio" : "Reativar anúncio"}
              icon="Power"
              variant={isActive ? "primary" : "secondary"}
            />
            <Button
              title="Excluir anúncio"
              icon="Trash"
              variant="tertiary"
            />
          </VStack>
        }

      </VStack>
    </ScrollView>
  );
}
