import Dexie from 'dexie'
import { DBFormData } from '../pages/form/store/types'

class AppDatabase extends Dexie {
  form: Dexie.Table<DBFormData, number>

  constructor() {
    super('AppDatabase')
    this.version(1).stores({
      form: '++id, name,createAt,updateAt, compList,props,extra',
    })
    this.form = this.table('form')
  }
}

const db = new AppDatabase()

export function saveForm(data: DBFormData) {
  return db.transaction('rw', db.form, async () => {
    const id = await db.form.put(data, data.id)
    return id
  })
}

export async function getFormList(offset = 0) {
  return db.transaction('r', db.form, async () => {
    const list = await db.form
      .orderBy('updateAt')
      .reverse()
      .limit(3)
      .offset(offset)
      .toArray()
    return list
  })
}

export function getFormDataById(id: number) {
  return db.form.get(id)
}
