import { Card } from "@components/Card"
import { Header } from "@components/Header"
import { Select } from "@components/Select"
import { FlatList, HStack, IconButton, Text, VStack, useTheme, useToast } from "native-base"
import { Plus } from "phosphor-react-native"
import { useCallback, useEffect, useState } from "react"
import {
  useQuery
} from '@tanstack/react-query'
import { ProductDTO } from "@dtos/ProductDTO"
import { api } from "@services/api"
import { AppError } from "@utils/AppError"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { RefreshControl } from "react-native-gesture-handler"
import { useAuth } from "@hooks/useAuth"
import { AppNavigatorRoutesProps } from "@routes/app.routes"
import { SafeAreaView } from "react-native-safe-area-context"
import { useMyAds } from "@hooks/useMyAds"

export function UserAds() {
  const theme = useTheme()
  const toast = useToast()
  const [filter, setFilter] = useState('all')
  const [productsFormatted, setProductsFormatted] = useState<ProductDTO[]>([])
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { user } = useAuth()
  const { products, isLoading, refetch } = useMyAds()

  function handleOpenNewCreateAds() {
    navigation.navigate("createAds")
  }
  
  function handleOpenAdDetails(id: string) {
    navigation.navigate("adDetails", {id, isEditable: true})
  }

  useFocusEffect( useCallback( () => {
    refetch()
  },[]))

  const options = [
    {label: 'Todos', value: 'all'},
    {label: 'Ativos', value: 'active'},
    {label: 'Inativos', value: 'inative'}
  ]

  useEffect(() => {
    if (!products) {return}

    let filteredProducts = products
    if (filter !== 'all'){
      filteredProducts = products?.filter(products => products.is_active === (filter === 'active'))
    }

    setProductsFormatted(filteredProducts)
  }, [filter, products])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.gray[200] }} >
      <VStack flex={1} bg="gray.200">
        <Header
          mt={4}
          bg="gray.200"
          title="Meus anúncios"
          rightIcon={
            <IconButton
              onPress={handleOpenNewCreateAds}
              icon={
                <Plus
                  size={24}
                  color={theme.colors.gray[700]}
                />
              }
              rounded="full"
              _pressed={{
                bg: 'gray.300'
              }}
            />
          }
        />

        <VStack p={6} flex={1}>
          <HStack 
            alignItems="center" 
            justifyContent="space-between"
          >
            <Text
              fontSize="sm"
              color="gray.600"
            >
              {productsFormatted?.length} {productsFormatted?.length !== 1 ? 'anúncios' : 'anuncio' }
            </Text>

            <Select options={options} value={filter} onSelect={setFilter}/>
          </HStack>

          <FlatList
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}
            data={productsFormatted}
            keyExtractor={(item) => item.id!}
            numColumns={2}
            renderItem={({item}) => (
              <Card 
                advertiser={user} 
                product={item} 
                onPress={() => handleOpenAdDetails(item.id!)}
              />
            ) }
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 24
            }}
            mt={7}
          />
        </VStack>
      </VStack>
    </SafeAreaView>
  )
}