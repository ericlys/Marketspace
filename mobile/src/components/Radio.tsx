import { FormControl, IRadioGroupProps, Radio as NativeBaseRadio, Stack, Text, theme, useTheme } from 'native-base'
import { CheckSquare } from 'phosphor-react-native'

type Props = IRadioGroupProps & {
  name: string
  errorMessage?: string | null
  options: {
    label: string
    value: string
  }[]
}


export function Radio( { name,options, errorMessage = null, mt, mb, isInvalid, ...rest}: Props) {
  const invalid = !!errorMessage || isInvalid;
  const theme = useTheme()

  return (
    <FormControl isInvalid={invalid} mt={mt} mb={mb ?? 4} >
    <NativeBaseRadio.Group
      name={name}   
      {...rest}
    >
      {options.map(option => 
        <NativeBaseRadio 
          key={option.value} 
          value={option.value}
          _icon={{
            color: "blue.400",
            size: "xs"
          }}
          colorScheme="blue"
          _checked={{
            borderColor: "blue.400",
          }}
          _pressed={{
            borderColor: "gray.300",
          }}
          
        >
          <Text
            fontSize="md"
            color="gray.600"
            mr={5}
          >
            {option.label}
          </Text>
        </NativeBaseRadio>
      )}
    </NativeBaseRadio.Group>
    <FormControl.ErrorMessage _text={{color: "red.500"}}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </ FormControl>
  )
}