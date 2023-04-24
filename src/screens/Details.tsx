import { Header } from "@components/Header";
import { Slide } from "@components/Slide";
import { VStack } from "native-base";

export function Details() {

  const data = [
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS8zMTgyY2Q5Y2ZiMWQyMTRmOWMzMzA2OTVhMjI1ZGQyNC5qcGc",
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS9jMjIzZGJmMWU4MmJjYWZiNWM1NDU4OThmYTU0ZmY5MS5qcGc",
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS9hZGFlYzA3ZDQ5MjM2ZTY5YjdhNWE4YjJlZWUzMzMyNy5qcGc",
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS9lNGY5MDZhYzkzOTgzYzBhNGVkODgwMDNiM2I4MjI5NS5qcGc",
    "https://photos.enjoei.com.br/tenis-vans-authentic-roxo-82519394/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8yNjAxMDUxMS9jMDE4MjFmZGZmMzY3YzQwNGY0ZGM5OWFjNTljOGViNy5qcGc"
  ]

  return(
    <VStack
      flex={1}
      bg="gray.200"
    >
      <Header 
       onBack={() => {}}
      />
      <Slide images={data}/>
    </VStack>
  )
}