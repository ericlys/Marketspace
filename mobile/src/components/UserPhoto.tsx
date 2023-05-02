import { IImageProps, Image } from "native-base";

type Props = IImageProps & {
  size: number
  borderColor?: string
}

export function UserPhoto({size, borderWidth=3, borderColor="blue.400", ...rest}: Props){
  return(
    <Image 
      w={size}
      h={size}
      rounded="full"
      borderWidth={borderWidth}
      borderColor={borderColor}
      {...rest}
    />
  )
}