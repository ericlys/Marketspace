import { useCallback, useRef, useState } from "react"
import { Pressable, TouchableOpacity } from "react-native"

import  { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Box, FlatList, HStack, Heading, Text, VStack, useTheme } from "native-base"
import { ArrowRight, Tag as TagIcon, X } from "phosphor-react-native"

import { Button } from "@components/Button"
import { Card } from "@components/Card"
import { Checkbox, Group } from "@components/CheckBox"
import { SearchBar } from "@components/SearchBar"
import { Switch } from "@components/Switch"
import { UserPhoto } from "@components/UserPhoto"
import { Tag } from "@components/Tag"

import { useAuth } from "@hooks/useAuth"
import { api } from "@services/api"
import userPhotoPng from '@assets/userPhotoDefault.png'
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { SafeAreaView } from "react-native-safe-area-context"

export function Home(){
  const theme = useTheme()
  const [checkGroup, setCheckGroup] = useState([])
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenNewCreateAds() {
    navigation.navigate("createAds")
  }

  const { user } = useAuth()

  const tradeMethods = [
    {label: 'Boleto', value: 'bank_slip'},
    {label: 'Pix', value: 'pix'},
    {label: 'Dinheiro', value: 'cash'},
    {label: 'Cartão de Crédito', value: 'credit_card'},
    {label: 'Depósito Bancário', value: 'bank_deposit'}
  ]

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present()
  }, [])

  const handleCloseModalPress = useCallback(() => {
    bottomSheetRef.current?.close()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.gray[200] }} >
      <VStack flex={1} bg="gray.200" px={6} pt="8">
        <HStack>
          <HStack flex={1}>
            <UserPhoto 
              source={
              user.avatar ? 
                { uri: `${api.getUri()}/images/${user.avatar}`}
                :
                userPhotoPng
              }
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
               {user.name}!
              </Text>
            </VStack>
          </HStack>
          <Button 
            flex={1}
            maxW="140"
            icon="Plus"
            title="Criar anúncio"
            variant="primary"
            onPress={handleOpenNewCreateAds}
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
            onFilter={handlePresentModalPress}
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

        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={['68%']}
          index={0}
          enablePanDownToClose
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
            <HStack justifyContent="space-between">
            <Heading
              fontFamily="heading"
              fontSize="lg"  
            >
              Filtrar anúncios
            </Heading>

            <Pressable
              onPress={handleCloseModalPress}
            >
              <X size={24} color={theme.colors.gray[400]}/>
            </Pressable>
            </HStack>

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
        </BottomSheetModal>
      </VStack>
    </SafeAreaView>
  )
} 