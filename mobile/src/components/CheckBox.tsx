import { Checkbox as NativeBaseCheckbox, ICheckboxProps, ICheckboxGroupProps, Text, FormControl } from "native-base"
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
])

type Props = ICheckboxProps & {
  label: string
}

type GroupProps = ICheckboxGroupProps & {
  errorMessage?: string | null
}

export function Group({ mt, mb, errorMessage = null, ...rest} : GroupProps){
  const invalid = !!errorMessage

  return (
    <FormControl isInvalid={invalid} mt={mt} mb={mb ?? 4}>
      <NativeBaseCheckbox.Group {...rest}/>
      <FormControl.ErrorMessage _text={{color: "red.500"}}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
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
