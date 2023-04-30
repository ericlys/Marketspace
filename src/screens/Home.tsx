import { useState } from "react";
import { TouchableOpacity } from "react-native";

import BottomSheet from '@gorhom/bottom-sheet';
import { Box, FlatList, HStack, Heading, Text, VStack, useTheme } from "native-base";
import { ArrowRight, Tag as TagIcon } from "phosphor-react-native";

import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Checkbox, Group } from "@components/CheckBox";
import { SearchBar } from "@components/SearchBar";
import { Switch } from "@components/Switch";
import { UserPhoto } from "@components/UserPhoto";
import { Tag } from "@components/Tag";

export function Home(){
  const theme = useTheme()
  const [checkGroup, setCheckGroup] = useState([])

  const tradeMethods = [
    {label: 'Boleto', value: 'bank_slip'},
    {label: 'Pix', value: 'pix'},
    {label: 'Dinheiro', value: 'cash'},
    {label: 'Cartão de Crédito', value: 'credit_card'},
    {label: 'Depósito Bancário', value: 'bank_deposit'}
  ]

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
              <TagIcon size={22} color={theme.colors.blue[500]}/>
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

        <BottomSheet
          snapPoints={['65%', '75%']}
          index={0}
          onChange={() => console.log('oi')}
          handleStyle={{    
            backgroundColor: theme.colors.gray[100],
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.gray[300],
            width: 70
          }}
        >
          <VStack flex={1} py={8} px={6} bg="gray.100">
            <Heading
              fontFamily="heading"
              fontSize="lg"  
            >
              Filtrar anúncios
            </Heading>

            <Text
              mt={6}
              fontFamily="heading"
              fontSize="sm"  
            >
              Condição
            </Text>

            <HStack space={2} mt={3}>
              <Tag title="Novo" active />
              <Tag title="Usado" />
            </HStack>

            <Text
              mt={6}
              fontFamily="heading"
              fontSize="sm"  
            >
              Aceita troca?
            </Text>

            <Switch mt={3}/>

            <Text
              mt={6}
              fontFamily="heading"
              fontSize="sm"  
            >
              Meios de pagamentos aceitos
            </Text>

            <Group
              mt={3}
              defaultValue={checkGroup} 
              value={checkGroup} 
              onChange={(values) => {
                setCheckGroup(values || [])
              }}
              accessibilityLabel="pick an item"
            >
            { tradeMethods.map( method =>
                <Checkbox 
                  key={method.value}
                  label={method.label}
                  value={method.value} 
                  mb={2}
                />
            )}
            </Group>

            <HStack 
              mt={16}
              alignItems="center" 
              justifyContent="space-between"
              space={3}
            >
              <Button
                flex={1}
                title="Resetar filtros"
                variant="tertiary"
              />

              <Button
                flex={1}
                title="Aplicar filtros"
                variant="primary"
              />
            </HStack>

          </VStack>
        </BottomSheet>
      </VStack>
    </VStack>
  )
} 