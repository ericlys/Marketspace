import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppTabRoutes } from './appTab.routes'
import { CreateAd } from '@screens/CreateAd'
import { AdDetails } from '@screens/Advertisement/AdDetails'
import { AdPreview } from '@screens/Advertisement/AdPreview'
import { ProductDTO } from '@dtos/ProductDTO'

type AuthRoutes = {
  appTabRoutes: undefined
  createAds: {
    productEditable?: ProductDTO,
  } | undefined
  adDetails: {
    id: string,
    isEditable?: boolean
  }
  adPreview: {
    product: ProductDTO,
    removedImages: string[]
  }
}

export type AppNavigatorRoutesProps =  NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AppRoutes() {
  return (
    <Navigator 
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name='appTabRoutes' component={AppTabRoutes}/>
      <Screen name='createAds' component={CreateAd}/>
      <Screen name='adDetails' component={AdDetails}/>
      <Screen name='adPreview' component={AdPreview}/>
    </Navigator>
  )
}