export type ProductDTO = {
  name: string 
  description: string 
  accept_trade: boolean
  is_new: boolean
  payment_methods: Array<'boleto' | 'pix' | 'cash' | 'card' | 'deposit'>
  price: number 
  productImages: string[]
}