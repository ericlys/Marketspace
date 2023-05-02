import { Input as NativeBaseInput, IInputProps, FormControl, HStack, Icon, Pressable, Text } from 'native-base'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useState } from 'react';

type Props = IInputProps & {
  errorMessage?: string | null
  prefix?: string | null
}

export function Input({ prefix = null, onBlur, onFocus, errorMessage = null, mb, mt, isInvalid, secureTextEntry, ...rest}: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)
  const invalid = !!errorMessage || isInvalid;

  function handleSwitchShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleFocus() {
    setFocused(true)
    onFocus
  }

  function handleBlue() {
    setFocused(false)
    onBlur
  }

  return (
    <FormControl isInvalid={invalid} mt={mt} mb={mb ?? 4}>
      <HStack
        alignItems="center"
        bg="gray.100"
        borderRadius="md"
        borderWidth={focused ? 1 : 0}
        borderColor={focused ? "gray.500" : ""}
      >
        {prefix && 
          <Text
            fontFamily="body"
            fontSize="md"
            color="gray.700"
            pl={4}
            pr={2}
          >
            {prefix}
          </Text>
        }

        <NativeBaseInput
          flex={1}
          h={12}
          px={prefix ? 0 : 4}
          borderWidth={0}
          fontSize="md"
          color="gray.600"
          fontFamily="body"
          placeholderTextColor="gray.400"
          isInvalid={invalid}
          secureTextEntry={secureTextEntry && !showPassword}
          _invalid={{
            borderWidth: 1,
            borderColor: 'red.500'
          }}
          onFocus={handleFocus}
          onBlur={handleBlue}
          _focus={{
            bg: "gray.100"
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