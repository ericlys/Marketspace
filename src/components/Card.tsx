import { Pressable, IPressableProps, Box, Image, VStack, useTheme, Text } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { useState } from "react";

type Props = IPressableProps & {
  condition: 'new' | 'used' 
  active?: boolean
}

export function Card({ condition, active=true, ...rest}: Props) {
  const theme = useTheme()
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
     onPressIn={() => setIsPressed(true)}
     onPressOut={() => setIsPressed(false)}
     {...rest}
    >
      <VStack
        style={{
          transform: [{
            scale: isPressed && active ? 0.96 : 1
          }]
        }}
      >
        <Box>
          <Image 
            source={{
              uri: "https://photos.enjoei.com.br/tenis-adidas-84859201/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yODkxOTUzOS8yN2JmYTFjN2E2ZjUzZmFiZGY3MDBhMmIzYzFlYWIxYS5qcGc"
            }} 
            alt="Imagem do produto"
            w={153}
            h={100}
            resizeMode="cover" 
            borderRadius="md"
            position="relative"
          />

          <UserPhoto 
            src="https://avatars.githubusercontent.com/ericlys" 
            alt="Imagem do perfil do vendedor"
            size={6}
            borderWidth={1}
            borderColor={theme.colors.gray[100]}
            position="absolute"
            top="1"
            left="1"
          />

          <Text
            bg={condition === "new" ? "blue.500" : "gray.600"}
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
              {condition === "new" ? "NOVO" : "USADO"}
          </Text>

          { !active && (
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
          color={active ? "gray.600" : "gray.400"}
          fontSize="sm"
          >
          Tênis adidas branco
        </Text>
        <Text
          color={active ? "gray.700" : "gray.400"}
          fontFamily="heading"
          fontSize="md"
        >
          R$ 180,90
        </Text>
      </VStack>
    </Pressable>
  )
}