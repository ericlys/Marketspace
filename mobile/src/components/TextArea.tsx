import { TextArea as NativeBaseTextArea, ITextAreaProps, FormControl } from 'native-base'

type Props = ITextAreaProps & {
  errorMessage?: string | null;
}

export function TextArea({ errorMessage = null, mb, mt, isInvalid, ...rest}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mt={mt} mb={mb ?? 4}>
      <NativeBaseTextArea
        autoCompleteType
        alignItems="center"
        bg="gray.100"
        borderRadius="md"
        flex={1}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="gray.600"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
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
      <FormControl.ErrorMessage _text={{color: "red.500"}}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}