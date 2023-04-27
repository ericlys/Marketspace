import { Button } from "@components/Button"
import { Slide } from "@components/Slide"
import { Trade } from "@components/Trade"
import { UserPhoto } from "@components/UserPhoto"
import { Box, Center, HStack, Heading, ScrollView, Text, VStack } from "native-base"

type Props = {
  isMy?: boolean
  isActive?: boolean
}

export function AdView({isMy=false, isActive=true}: Props) {
  const data = [
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS8zMTgyY2Q5Y2ZiMWQyMTRmOWMzMzA2OTVhMjI1ZGQyNC5qcGc",
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS9jMjIzZGJmMWU4MmJjYWZiNWM1NDU4OThmYTU0ZmY5MS5qcGc",
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS9hZGFlYzA3ZDQ5MjM2ZTY5YjdhNWE4YjJlZWUzMzMyNy5qcGc",
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS9lNGY5MDZhYzkzOTgzYzBhNGVkODgwMDNiM2I4MjI5NS5qcGc",
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS9jMDE4MjFmZGZmMzY3YzQwNGY0ZGM5OWFjNTljOGViNy5qcGc",
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box>
        <Slide images={data} position="relative"/>
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
      </Box>

      <VStack my={5} mx={6}>
        <HStack alignItems="center">
          <UserPhoto
            src="https://avatars.githubusercontent.com/ericlys"
            alt="Imagem do perfil do vendedor"
            size={6}
            borderWidth={2}
            mr={2}
          />
          <Text fontSize="sm">Ericlys Moreira</Text>
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
          usado
        </Text>

        <HStack mt={2.5} alignItems="center" justifyContent="space-between">
          <Heading fontFamily="heading" fontSize="lg">
            Tênis Vans authentic roxo
          </Heading>

          <HStack alignItems="baseline">
            <Text color="blue.400" fontSize="sm" fontFamily="heading">
              R$
            </Text>
            <Text color="blue.400" fontSize="lg" fontFamily="heading">
              213,00
            </Text>
          </HStack>
        </HStack>

        <Text mt={2} fontSize="sm" lineHeight={18.2} color="gray.600">
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
          Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
          nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
          in aliquam.
        </Text>

        <HStack mt={6} alignItems="baseline">
          <Text color="gray.600" fontFamily="heading" fontSize="sm" mr={2}>
            Aceita troca?
          </Text>
          <Text mt={2} fontSize="sm" color="gray.600">
            Sim
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

          <Trade type="bank_slip" />
          <Trade type="pix" />
          <Trade type="cash" />
          <Trade type="credit_card" />
          <Trade type="bank_deposit" />
        </Box>

      {isMy &&    
        <VStack mt={8} space={2}>
          <Button
            title={isActive ? "Reativar anúncio" :"Desativar anúncio"}
            icon="Power"
            variant={isActive ? "secondary" : "primary"}
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
