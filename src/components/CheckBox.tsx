import { Checkbox as NativeBaseCheckbox, ICheckboxProps, ICheckboxGroupProps, Text } from "native-base"
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
])

type Props = ICheckboxProps & {
  label: string
}

export function Group({...rest} : ICheckboxGroupProps){
  return (
    <NativeBaseCheckbox.Group {...rest}/>
  )
}



export function Checkbox({label, ...rest}: Props){
  return (
    <NativeBaseCheckbox
      bg="transparent"
      _checked={{
        borderColor: "blue.400",
        bg: 'blue.400'
      }}
      _icon={{
        bg: 'transparent'
      }}
      {...rest}
      >
      <Text color="gray.600" fontSize="md">{label}</Text>
    </NativeBaseCheckbox>
  )
}
