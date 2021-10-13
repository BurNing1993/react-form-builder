import { generateId } from '../../utils'

it('generateId', () => {
  expect(generateId().length).toEqual(6)
})
