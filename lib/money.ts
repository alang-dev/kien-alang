const intl = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
})

export function toVND(price: number) {
  return intl.format(price)
}
