import { Input as NativeBaseInput, IInputProps, FormControl, HStack, Icon, Pressable } from 'native-base'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useState } from 'react';

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, secureTextEntry, ...rest}: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const invalid = !!errorMessage || isInvalid;

  function handleSwitchShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <HStack
        alignItems="center"
        bg="gray.100"
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
          isInvalid={invalid}
          secureTextEntry={!showPassword}
          _invalid={{
            borderWidth: 1,
            borderColor: 'red.500'
          }}
          _focus={{
            bg: "gray.100",
            borderWidth: 1,
            borderColor: "gray.500"
          }}
          _disabled={{
            bg: "gray.300"
          }}
          {...rest}
        />

        {secureTextEntry &&
          <Pressable
          onPress={handleSwitchShowPassword}
          >
            <Icon 
              as={ showPassword ? EyeSlash : Eye}
              mr={4}
              ml={2}
            />
          </Pressable>
        }
      </HStack>
      <FormControl.ErrorMessage _text={{color: "red.500"}}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}