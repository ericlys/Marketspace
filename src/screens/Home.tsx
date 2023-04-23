import { Button } from "@components/Button";
import { SearchBar } from "@components/SearchBar";
import { UserPhoto } from "@components/UserPhoto";
import { Box, HStack, ScrollView, Text, VStack, useTheme } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { Pressable } from "react-native";

export function Home(){
  const theme = useTheme()

  return (
    <ScrollView 
    contentContainerStyle={{flexGrow: 1}} 
    showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.200" p={6} pt="16">
        <HStack>
          <HStack flex={1}>
            <UserPhoto 
              src="https://avatars.githubusercontent.com/ericlys" 
              alt="Imagem do perfil do usuário"
              size={12}
              borderWidth={2}
            />
            <VStack ml="2.5">
              <Text
               fontSize="md"
               fontFamily="body"
              >
                Boas vindas,
              </Text>
              <Text
                fontSize="md"
                fontFamily="heading"
              >
               Ericlys!
              </Text>
            </VStack>
          </HStack>
          <Button 
            flex={1}
            maxW="140"
            icon="Plus"
            title="Criar anúncio"
            variant="primary"
          />
        </HStack>

        <Box mt="8">``
          <Text color="gray.500" fontSize="sm">
            Seus produtos anunciados para venda
          </Text>

          <HStack 
            width="full" 
            bg="rgba(100, 122, 199, 0.1)" 
            borderRadius="md"
            px="5"
            py="3" 
            mt="3"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack alignItems="center">
              <Tag size={22} color={theme.colors.blue[500]}/>
              <VStack ml={4}>
                <Text
                  fontFamily="heading"
                  fontSize="lg"
                >
                  4
                </Text>
                <Text
                  fontSize="xs"
                  color="gray.600"
                >
                  anúncios ativos
                </Text>
              </VStack>
            </HStack>
            
            <Pressable              
            >
              <HStack alignItems="center">
                <Text
                  fontFamily="heading"
                  fontSize="xs"
                  color="blue.500"
                >
                  Meus anúncios 
                </Text>
                <ArrowRight size={16} color={theme.colors.blue[500]}/>
              </HStack>
            </Pressable>

          </HStack>
        </Box>
      
        <VStack mt="8">
          <Text
            color="gray.500"
            fontSize="sm"
          >
            Compre produtos variados
          </Text>
          <SearchBar 
            mt="4"
            placeholder="Buscar anúncio"
          />
        </VStack>

      </VStack>
    </ScrollView>
  )
} 