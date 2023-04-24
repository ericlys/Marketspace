import { Box, HStack, Image } from 'native-base'
import { useState } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel'

type Props = {
  images: string[],
}

export function Slide({images}: Props) {
  const width = Dimensions.get('window').width;
  const [itemSnapped, setItemSnapped] = useState(0)

  return(
    <Box>
      <Carousel
        data={images}
        width={width * 1.001}
        pagingEnabled
        height={280}
        onSnapToItem={(index) => setItemSnapped(index)}
        renderItem={
          ({item}) => (
            <Image
              key={item}
              w="full"
              h="280"
              source={{
                uri: item
              }}
              alt='Product image'
            />
          )
        }
      />
      {images.length > 1 && (
        <HStack position="absolute" bottom={0.5}>
          {images.map((_, index) => (
            <Box 
              key={index}
              bg={"gray.100"} 
              w={width * 0.9531/images.length} 
              p="1.5px" mx={0.5}
              rounded="full"
              opacity={itemSnapped !== index ? 0.5 : 1}
            />
          ))}
        </HStack>
      )}
    </Box>
  )

  
}