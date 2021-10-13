const metadata =
  'abcderghijklmnopqrstuvwxyzABCDERGHIJKLMNOPQRSTUVWXYZ01234567890'

export function generateId(n = 6) {
  let result = ''
  const l = metadata.length
  for (let i = 0; i < n; i++) {
    const x = randomInt(l)
    result += metadata[x]
  }
  return result
}

function randomInt(max: number, min = 0) {
  return Math.round(Math.random() * (max - min)) + min
}
