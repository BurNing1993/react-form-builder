import { generateId, randomInt } from '../../utils'

it('generateId', () => {
  expect(generateId().length).toEqual(6)
})

it('test randomInt', () => {
  const n = randomInt(1, 0)
  expect(n).toBeLessThanOrEqual(1)
  expect(n).toBeGreaterThanOrEqual(0)
})
