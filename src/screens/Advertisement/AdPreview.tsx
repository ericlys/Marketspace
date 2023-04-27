import { Button } from "@components/Button";
import { Center, HStack, Heading, Text, VStack } from "native-base";
import { AdView } from "./components/AdView";

export function AdPreview() {

  return (
    <VStack flex={1} bg="gray.200">
      <Center bg="blue.400">
        <Heading 
          pt={8}
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

      <AdView/>

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
        />
        <Button
          flex={1}
          icon="Tag"
          title="Publicar"
        />
      </HStack>
    </VStack>
  );
}
