export type ProductDTO = {
  id?: string
  name: string 
  description: string 
  accept_trade: boolean
  is_new: boolean
  is_active?: boolean
  payment_methods: Array<'boleto' | 'pix' | 'cash' | 'card' | 'deposit'>
  price: number 
  product_images: {
    path: string
    id?: string
  }[]
}