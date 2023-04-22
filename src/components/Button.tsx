import { Button as ButtonNativeBase, IButtonProps, Text, useTheme } from "native-base";
import * as PhosphorIcon from 'phosphor-react-native'

type Props = IButtonProps & {
  title: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  icon?: keyof typeof PhosphorIcon
}

export function Button({title, variant="secondary", icon, ...rest}: Props){
  const theme = useTheme()
  const colors = {
    primary: theme.colors.gray[700],
    secondary: theme.colors.blue[400],
    tertiary: theme.colors.gray[300],
  }


  const Icon = icon ? PhosphorIcon[icon] : null as any
  const activeVariant = colors[variant as 'primary' | 'secondary' | 'tertiary']


  return(
    <ButtonNativeBase
      bg={activeVariant}
      w="full"
      h={12}
      _pressed={{
        bg: variant === 'secondary' ?  'blue.500' : 'gray.400' 
      }}
      
      leftIcon={ icon ? 
        <Icon
          color={ variant === "tertiary" ? theme.colors.gray[700] : theme.colors.gray[100]}
          size={16}
        />
      : undefined }
      {...rest}
    >
      <Text
        color={variant === 'tertiary' ? 'gray.700' : 'gray.100'}
        fontSize="sm"
        fontFamily="heading"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}