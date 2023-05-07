import { MyAdsContext } from "@contexts/MyAdsContext"
import { useContext } from "react"

export function useMyAds() {
  const context = useContext(MyAdsContext)

  return context
}