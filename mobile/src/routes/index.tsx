import { DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { Box, useTheme } from "native-base"
import { AuthRoutes } from "./auth.routes"
import { useAuth } from "@hooks/useAuth"
import { Loading } from "@components/Loading"
import { AppRoutes } from "./app.routes"

export function Routes(){
  const { colors } = useTheme()

  const { user, isLoadingUserStorageData } = useAuth()
  
  const theme = DefaultTheme
  theme.colors.background= colors.gray[200]

  if(isLoadingUserStorageData) {
    return (
      <Loading/>
    )
  }

  return(
    <Box flex={1} bg="gray.200">
      <NavigationContainer theme={theme}>
          {user.id ? <AppRoutes/> : <AuthRoutes/> }
      </NavigationContainer>
    </Box>
  )
}