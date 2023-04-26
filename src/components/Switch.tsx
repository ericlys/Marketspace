import { Switch as NativeBaseInputSwitch, ISwitchProps, HStack, Box, View } from 'native-base'

type Props = ISwitchProps & {}

export function Switch({value=false, onValueChange, ...rest}: Props) {
  return (
      <View 
        bg={value ? "blue.400" : "gray.300"} 
        rounded="full" 
        w={50}
        h={7} 
        pr={'0.5'}
        justifyContent="center"
        alignItems="center"
      >
      <NativeBaseInputSwitch
        size="lg"
        offTrackColor={"transparent"}
        onTrackColor={"transparent"}
        value={value}
        onValueChange={onValueChange}
        h={7}        
        isChecked={value}
        {...rest}
      />
      </View>
  )
}