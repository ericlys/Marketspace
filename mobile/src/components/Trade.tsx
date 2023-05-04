import { HStack, Icon, Text } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

type Props = IHStackProps & {
  type: 'boleto' | 'pix' | 'cash' | 'card' | 'deposit' 
}

const icons = {
  boleto: <Barcode size={24}
  weight="bold"
  />,
  pix: <QrCode size={18}/>,
  cash: <Money size={18}/>,
  card: <CreditCard size={18}/>,
  deposit: <Bank size={18}/>
}

const tradeString = {
  boleto: "Boleto",
  pix: "Pix",
  cash: "Dinheiro",
  card: "Cartão de Credito",
  deposit: "Depósito Bancário"
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