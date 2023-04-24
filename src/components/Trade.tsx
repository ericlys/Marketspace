import { HStack, Icon, Text } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

type Props = IHStackProps & {
  type: 'bank_slip' | 'pix' | 'cash' | 'credit_card' | 'bank_deposit' 
}

const icons = {
  bank_slip: <Barcode size={24}
  weight="bold"
  />,
  pix: <QrCode size={18}/>,
  cash: <Money size={18}/>,
  credit_card: <CreditCard size={18}/>,
  bank_deposit: <Bank size={18}/>
}

const tradeString = {
  bank_slip: "Boleto",
  pix: "Pix",
  cash: "Dinheiro",
  credit_card: "Cartão de Credito",
  bank_deposit: "Depósito Bancário"
}

export function Trade({type, ...rest}: Props){
  
  return(
    <HStack
    alignItems="center"
    {...rest}
    >
      <Icon
        mr={2}
        as={icons[type]}
      />
      <Text>
        {tradeString[type]}
      </Text>
    </HStack>
  )
}