import { IImageProps, Image } from "native-base";

type Props = IImageProps & {
  size: number
}

export function UserPhoto({size, borderWidth=3, ...rest}: Props){
  return(
    <Image 
      w={size}
      h={size}
      rounded="full"
      borderWidth={borderWidth}
      borderColor="blue.400"
      {...rest}
    />
  )
}