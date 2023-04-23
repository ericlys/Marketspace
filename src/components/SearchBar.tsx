import { Box, HStack, IInputProps, IconButton, Input as NativeBaseInput, useTheme } from "native-base";
import { MagnifyingGlass, PencilSimpleLine, Sliders } from "phosphor-react-native";


type Props = IInputProps & {

}


export function SearchBar({mt=0, mb=0,...rest}: Props) {
  const theme = useTheme()

  return(
  <HStack
    alignItems="center"
    bg="gray.100"
    mt={mt}
    mb={mb}
    borderRadius="md"
  >
    <NativeBaseInput
      flex={1}
      h={12}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="gray.600"
      fontFamily="body"
      placeholderTextColor="gray.400"
      _invalid={{
        borderWidth: 1,
        borderColor: 'red.500'
      }}
      _focus={{
        bg: "gray.100",
        borderRadius: "none",
        borderTopLeftRadius: "md",
        borderBottomLeftRadius: "md",
        borderWidth: 1,
        borderColor: "gray.500"
      }}
      _disabled={{
        bg: "gray.300"
      }}
      {...rest}
    />
    <IconButton
      icon={
        <MagnifyingGlass
          size={20}
          weight="bold"
          color={theme.colors.gray[700]}
        />
      }
      p="3"
      h="full"
      _pressed={{
        bg: 'gray.200'
      }}/>

    <Box
      h="0.5"
      w="0.4"
      bg="gray.300"
      pt="6"
    />

    <IconButton
      icon={
        <Sliders
          size={20}
          weight="bold"
          color={theme.colors.gray[700]}
        />
      }
      p="3"
      h="full"
      _pressed={{
        bg: 'gray.200'
      }}/>
  </HStack>
  )
}