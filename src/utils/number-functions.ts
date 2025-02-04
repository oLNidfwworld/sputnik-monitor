export function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function round(x: number, fractionDigits: number) {
  return (
    Math.round((x + Number.EPSILON) * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits)
  )
}
