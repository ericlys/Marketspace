import { Box, HStack, IBoxProps, IIconButtonProps, IconButton, Text, useTheme } from "native-base";
import { ArrowLeft } from "phosphor-react-native";

type Props = IBoxProps & {
  title?: string,
  onBack?: () => void,
  rightIcon?: JSX.Element | JSX.Element[] | undefined
}  

export function Header({onBack, title, rightIcon, ...rest}: Props) {
  const theme = useTheme()
  
  return (
    <HStack 
      w="full"
      px={6}
      pb={1}
      pt={16}//8
      bg="gray.100"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >

    {onBack ? (
      <IconButton
        onPress={onBack}
        icon={
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.gray[700]}
          />
        }
        rounded="full"
        _pressed={{
          bg: 'gray.300'
        }}
      />
    ): <Box w="8"/>}
 

    { title ? (
        <Text
          fontFamily="heading"
          fontSize="lg"
        >
          {title}
        </Text>
      ):
      (<Box/>)
    }
    
    {rightIcon ?
    ( 
      rightIcon
    ) :
    <Box w="8"/>
  }
    
    </HStack>
  )
}