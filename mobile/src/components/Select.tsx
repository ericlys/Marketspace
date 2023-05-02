import { Select as NativeSelect, ISelectProps } from 'native-base'
import { CaretDown, CaretUp } from 'phosphor-react-native'
import { useState } from 'react'

type Props = ISelectProps & {
  options: {
    label: string
    value: string
  }[]
  value: string
  onSelect: (value: string) => void
}

export function Select({options, value, onSelect, ...rest}: Props){
  const [active, setIsActive] = useState(false)

  return (
    <NativeSelect
      minW="32"
      fontSize="sm"
      color="gray.700"
      fontFamily="body"
      borderColor={active ? 'gray.400' : 'gray.300'}
      onOpen={() => setIsActive(true)}
      onClose={() => setIsActive(false)}
      dropdownIcon={!active ? <CaretDown size={16} style={{marginRight: 13}}/> : <CaretUp size={16} style={{marginRight: 13}}/>}
      _selectedItem={{
        bg: "gray.300",
      }}
      selectedValue={value}
      onValueChange={(value) => onSelect(value)}
      {...rest}
    >
      {options.map(item => 
        <NativeSelect.Item
         key={item.label} 
         label={item.label} 
         value={item.value}
        />
      )}
    </NativeSelect>
  )
}