import { useCallback, useRef, useState } from "react"
import { Pressable, TouchableOpacity } from "react-native"

import  { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Box, Center, FlatList, HStack, Heading, Text, VStack, useTheme, useToast } from "native-base"
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
import { useQuery } from "@tanstack/react-query"
import { ProductDTO } from "@dtos/ProductDTO"
import { AppError } from "@utils/AppError"
import { queryClient } from "../lib/ReactQuery"
import { Loading } from "@components/Loading"
import { RefreshControl } from "react-native-gesture-handler"

export function Home(){
  const theme = useTheme()
  const toast = useToast()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { user } = useAuth()

  const [filterIsNew, setFilterIsNew] = useState("")
  const [filterAcceptTrade, setFilterAcceptTrade] = useState(false)
  const [filterPaymentMethods, setFilterPaymentMethods] = useState<string[]>([])
  const [filterQuery, setFilterQuery] = useState("")

  function handleResetFilters() {
    setFilterIsNew("")
    setFilterAcceptTrade(false)
    setFilterPaymentMethods([])
    setFilterQuery("")
  }

  function handleOpenNewCreateAds() {
    navigation.navigate("createAds")
  }

  function handleOpenAdDetails(id: string) {
    navigation.navigate("adDetails", {id})
  }

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

  const { data: advertisements, isLoading, refetch } = useQuery<ProductDTO[]>(['advertisements'],
  async () => {
    try {
      let params = {}

      if (filterIsNew !== "") {
        params = {...params, is_new: filterIsNew === "new" ? true : false}
      }

      if (filterAcceptTrade) {
        params = {...params, accept_trade: filterAcceptTrade}
      }

      if (filterPaymentMethods.length > 0) {
        params = {...params, payment_methods: filterPaymentMethods}
      }


      if (filterQuery !== "") {
        params = { ...params, query: filterQuery }
      }

      const response = await api.get('/products', {
        params
      })

      return response.data
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os anúncios.'

        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.500'
        })

        return []
      }
    }
  )

  function handleAppleFilter() {
    refetch()
    handleCloseModalPress()
  }

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
            onSearch={refetch}
            onFilter={handlePresentModalPress}
            value={filterQuery}
            onChangeText={(value) => setFilterQuery(value)}
          />
        </VStack>
    
        { isLoading ? <Loading/> : (
          <FlatList
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}
            data={advertisements}
            keyExtractor={(item) => item.id!}
            numColumns={2}
            renderItem={({item}) => (
              <Card 
                product={item} 
                advertiser={item.user!}
                onPress={() => handleOpenAdDetails(item.id!)}
              />
            ) }
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 24
            }}
            ListEmptyComponent={(
              <Center flex={1}>
                <Text maxW="70%" fontFamily="heading" color="gray.500" textAlign="center">
                  Nenhum anúncio encontrado.
                </Text>
              </Center>
            )}
            contentContainerStyle={advertisements!.length === 0 && {flex: 1, justifyContent: 'center'}}
          />
        )}

        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={['70%']}
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
              <Tag 
                title="Novo"
                active={filterIsNew === "new"} 
                onActivate={() => setFilterIsNew("new")}
                onDeactivate={() => setFilterIsNew("")}
              />
              <Tag 
                title="Usado" 
                active={filterIsNew === "used"} 
                onActivate={() => setFilterIsNew("used")}
                onDeactivate={() => setFilterIsNew("")}
              />
            </HStack>

            <Text
              mt={6}
              fontFamily="heading"
              fontSize="sm"  
            >
              Aceita troca?
            </Text>

            <Switch 
              mt={3}
              value={filterAcceptTrade}
              onToggle={setFilterAcceptTrade}
            />

            <Text
              mt={6}
              fontFamily="heading"
              fontSize="sm"  
            >
              Meios de pagamentos aceitos
            </Text>

            <Group
              mt={3}
              defaultValue={filterPaymentMethods} 
              value={filterPaymentMethods} 
              onChange={(values) => {
                setFilterPaymentMethods(values || [])
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
                onPress={handleResetFilters}
              />

              <Button
                flex={1}
                title="Aplicar filtros"
                variant="primary"
                onPress={handleAppleFilter}
              />
            </HStack>

          </VStack>
        </BottomSheetModal>
      </VStack>
    </SafeAreaView>
  )
} 