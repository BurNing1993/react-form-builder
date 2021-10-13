import { useRecoilValue } from 'recoil'
import { formCompDataListKeysState } from './selector'
import { generateId } from '../../../utils'

// 生成唯一form key
export function useUniqueFormDataKey() {
  const keys = useRecoilValue(formCompDataListKeysState)
  const generateUniqueFormDataKey = () => {
    let key = ''
    while (!key || keys.includes(key)) {
      key = generateId()
    }
    return key
  }
  return generateUniqueFormDataKey
}
