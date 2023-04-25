import { Card } from "@components/Card";
import { Header } from "@components/Header";
import { Select } from "@components/Select";
import { FlatList, HStack, IconButton, Text, VStack, useTheme } from "native-base";
import { Plus } from "phosphor-react-native";
import { useState } from "react";

export function UserAds() {
  const theme = useTheme()

  const options = [
    {label: 'Todos', value: 'all'},
    {label: 'Ativos', value: 'actives'},
    {label: 'Inativos', value: 'inatives'}
  ]
  const [filter, setFilter] = useState('all')

  return (
    <VStack flex={1} bg="gray.200">
      <Header
        bg="gray.200"
        title="Meus anúncios"
        rightIcon={
          <IconButton
            onPress={() =>  {}}
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
            9 anúncios
          </Text>

          <Select options={options} value={filter} onSelect={setFilter}/>
        </HStack>

        <FlatList
          data={[1,2,3,4,5,6,7,8,45, 45123,425]}
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
          mt={7}
        />
      </VStack>
    </VStack>
  )
}