import { ProductDTO } from "@dtos/ProductDTO"
import { api } from "@services/api"
import { useQuery } from "@tanstack/react-query"
import { AppError } from "@utils/AppError"
import { useToast } from "native-base"
import { ReactNode, createContext } from "react"

export type AuthContextDataProps = {
  products: ProductDTO[]
  isLoading: boolean
  refetch: () => void
}

type MyAdsContextProviderProps = {
  children: ReactNode
}

export const MyAdsContext = createContext({} as AuthContextDataProps)

export function MyAdsContextProvider({children}: MyAdsContextProviderProps) {
  const toast = useToast()

  const { data: products, isLoading, refetch } = useQuery<ProductDTO[]>(['myProducts'],
    async () => {
      try {
        const response = await api.get('/users/products')
        return response.data
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError ? error.message : 'Não foi possível carregar os produtos do usuário.'

        toast.show({
          title,
          placement: 'top',
          bgColor: 'red.500'
        })

        return []
      }
    },
    {
      enabled: false
    }
  )

  return (
    <MyAdsContext.Provider 
      value={{ products: products ?? [], isLoading, refetch }}>
      {children}
    </MyAdsContext.Provider>
  )
}
