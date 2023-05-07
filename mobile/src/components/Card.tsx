import { Pressable, IPressableProps, Box, Image, VStack, useTheme, Text } from "native-base"
import { UserPhoto } from "./UserPhoto"
import { useState } from "react"
import { ProductDTO } from "@dtos/ProductDTO"
import { api } from "@services/api"
import { formatCurrency } from "@utils/formatters"
import { UserDTO } from "@dtos/UserDTO"

type Props = IPressableProps & {
  product: ProductDTO
  advertiser: UserDTO
}

export function Card({ product, advertiser, ...rest}: Props) {
  const theme = useTheme()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Pressable
     onPressIn={() => setIsPressed(true)}
     onPressOut={() => setIsPressed(false)}
     {...rest}
    >
      <VStack
        style={{
          transform: [{
            scale: isPressed && (product.is_active !== false) ? 0.96 : 1
          }]
        }}
      >
        <Box>
          <Image 
            source={
              { uri: `${api.getUri()}/images/${product.product_images[0].path}`}
            }
            alt="Imagem do produto"
            w={170}
            h={110}
            resizeMode="cover" 
            borderRadius="md"
            position="relative"
          />

          <UserPhoto 
            src={`${api.getUri()}/images/${advertiser.avatar}`}
            alt="Imagem do perfil do vendedor"
            size={6}
            borderWidth={1}
            borderColor={theme.colors.gray[100]}
            position="absolute"
            top="1"
            left="1"
          />

          <Text
            bg={product.is_new ? "blue.500" : "gray.600"}
            color="gray.100"
            fontFamily="heading"
            py="0.5"
            px="2"
            borderRadius="full"
            fontSize="xxs"
            position="absolute"
            top="1"
            right="1"
            textTransform="uppercase"
          >
              {product.is_new ? "NOVO" : "USADO"}
          </Text>

          { !(product.is_active !== false) && (
            <Box
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            bg="rgba(51, 52, 53, 0.5)" 
            borderRadius="md"
          >
            <Text
              fontFamily="heading"
              fontSize="xs"
              color="gray.100"
              mt="auto"
              mb="2"
              ml="2"
              textTransform="uppercase"
            >
              ANÚNCIO DESATIVADO
            </Text>
          </Box>
          )}
      

        </Box>

        <Text 
          mt="1"
          color={(product.is_active !== false) ? "gray.600" : "gray.400"}
          fontSize="sm"
          w={170}
          numberOfLines={1}
          >
          {product.name}
        </Text>
        <Text
          color={(product.is_active !== false) ? "gray.700" : "gray.400"}
          fontFamily="heading"
          fontSize="md"
        >
          R$ {formatCurrency(product.price.toString())}
        </Text>
      </VStack>
    </Pressable>
  )
}