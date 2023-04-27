import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { HStack, IconButton, Text, VStack, useTheme } from "native-base";
import { AdView } from "./components/AdView";
import { PencilSimpleLine } from "phosphor-react-native";

export function AdDetails() {
  const theme = useTheme()
  const myAd = true

  return (

    <VStack flex={1} bg="gray.200">
      {myAd ? (
        <Header 
          onBack={() => {}} 
          rightIcon={
            <IconButton
              onPress={() => {}}
              icon={
                <PencilSimpleLine
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
        )
        :
        (
          <Header onBack={() => {}} />
        )     
      }

      <AdView isMy isActive/>
      
      {!myAd && 
        <HStack bg="gray.100" py={25.5} px={6} alignItems="center" justifyContent="space-between">
        <HStack alignItems="baseline">
          <Text 
            color="blue.500" 
            fontSize="sm" 
            fontFamily="heading"
            mr="1"
          >
            R$
          </Text>
          <Text color="blue.500" fontSize="xl" fontFamily="heading">
            213,00
          </Text>
        </HStack>

        <Button
          w="auto"
          icon="WhatsappLogo"
          iconWeight="fill"
          title="Entrar em contato"
        />
        </HStack>
      }
    </VStack>
  );
}
