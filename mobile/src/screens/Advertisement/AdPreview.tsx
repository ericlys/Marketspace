import { Button } from "@components/Button";
import { Center, HStack, Heading, Text, VStack, useTheme } from "native-base";
import { AdView } from "./components/AdView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProductDTO } from "@dtos/ProductDTO";
import { useAuth } from "@hooks/useAuth";

type RouteParamsProps = {
  product: ProductDTO
}

export function AdPreview() {
  const {colors} = useTheme()
  const navigation = useNavigation()

  const route = useRoute()
  const { product } = route.params as RouteParamsProps

  const { user } = useAuth()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.blue[400] }} >
      <VStack flex={1} bg="gray.200">
        <Center bg="blue.400">
          <Heading 
            pt={2}
            fontFamily="heading"
            fontSize="md"
            color="gray.100"
          >
            Pré visualização do anúncio
          </Heading>
          <Text 
            pb={4}
            fontSize="sm"
            color="gray.100"
          >
            É assim que seu produto vai aparecer!
          </Text>
        </Center>

        <AdView
         user={user}
         product={product} 
         isMy
         isActive
        />

        <HStack 
          bg="gray.100" 
          pt={5} 
          pb={6}
          px={6} 
          alignItems="center" 
          space={3}
        >
          <Button
            flex={1}
            variant="tertiary"
            icon="ArrowLeft"
            title="Voltar e editar"
            onPress={handleGoBack}
          />
          <Button
            flex={1}
            icon="Tag"
            title="Publicar"
          />
        </HStack>
      </VStack>
    </SafeAreaView>
  )
}
