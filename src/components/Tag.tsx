import { HStack, IPressableProps, Pressable, Text, useTheme } from "native-base";
import { XCircle } from "phosphor-react-native";

type Props = IPressableProps & {
  title: string
  active?: boolean
  onActivate?: () => void
  onDeactivate?: () => void
}


export function Tag({title, active=false, onActivate, onDeactivate, ...rest}: Props) {
  const theme = useTheme()

  return (
    <Pressable
      onPress={ !active ? onActivate : onDeactivate }
    {...rest}
    >
      <HStack
        bg={active ? 'blue.400' : 'gray.300'}
        pl={4}
        pr={ active ? 1.5 : 4}
        py={1.5}
        rounded="full"
        alignItems="center"
        space={1.6}
      >
        <Text
          color={active ? 'gray.100' : 'gray.500'}
          fontFamily="heading"
          fontSize="s"
          textTransform='uppercase'
        >
          { title }
        </Text>

        { active && (
          <XCircle weight="fill" color={theme.colors.gray[100]} size={16}/>
        )}
      </HStack>
    </Pressable>
  )
}