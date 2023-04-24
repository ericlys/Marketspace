import { Header } from "@components/Header";
import {  IconButton, VStack } from "native-base";
import { ArrowLeft } from "phosphor-react-native";

export function Details() {
  return(
    <VStack
      flex={1}
      bg="gray.200"
    >
      <Header 
       onBack={() => {}}
      />
    </VStack>
  )
}