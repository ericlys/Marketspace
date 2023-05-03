export function formatCurrency(value: string) {
  const cleanedValue = value.replace(/\D/g, "")

  const integerPart = cleanedValue.slice(0, -2)
  const decimalPart = cleanedValue.slice(-2)
  let formattedValue = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  formattedValue += `,${decimalPart}`

  return formattedValue
}