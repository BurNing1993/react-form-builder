const metadata =
  'abcderghijklmnopqrstuvwxyzABCDERGHIJKLMNOPQRSTUVWXYZ01234567890'

export function generateId(n = 6) {
  let result = ''
  const l = metadata.length
  for (let i = 0; i < n; i++) {
    const x = randomInt(l) - 1
    result += metadata[x]
  }
  return result
}

/**
 * @param max
 * @param min
 * @returns min < n <= max
 */
export function randomInt(max: number, min = 0) {
  return Math.ceil(Math.random() * (max - min)) + min
}

/**
 * 下载blob文件
 * @param blob
 * @param fileName
 */
export function downloadBlob(blob: Blob, fileName: string) {
  const blobUrl = window.URL.createObjectURL(blob)
  const downloadLink = document.createElement('a')
  downloadLink.download = fileName
  downloadLink.style.display = 'none'
  downloadLink.href = blobUrl
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}
