import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { SearchBar } from "@components/SearchBar";
import { UserPhoto } from "@components/UserPhoto";
import { Box, FlatList, HStack, Text, VStack, useTheme } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

export function Home(){
  const theme = useTheme()

  return (
    <VStack 
    flex={1}
    >
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

        <Box mt="8">
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
                  fontSize="s"
                  color="gray.600"
                >
                  anúncios ativos
                </Text>
              </VStack>
            </HStack>
            
            <TouchableOpacity     
              onPress={() => {}}         
            >
              <HStack alignItems="center">
                <Text
                  fontFamily="heading"
                  fontSize="s"
                  color="blue.500"
                  mr="2"
                >
                  Meus anúncios 
                </Text>
                <ArrowRight size={16} color={theme.colors.blue[500]}/>
              </HStack>
            </TouchableOpacity>

          </HStack>
        </Box>

        <Text
          color="gray.500"
          fontSize="sm"
          mt="8"
          mb="4"
        >
          Compre produtos variados
        </Text>

        <VStack mb={4}>
          <SearchBar 
            placeholder="Buscar anúncio"
          />
        </VStack>
    
        <FlatList
          data={[1,2,3,4,5,6,7]}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({item}) => (
            <Card condition="new"/>
          ) }
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 24
          }}
          
        />

      </VStack>
    </VStack>
  )
} 