import { readFile, writeFile } from 'fs/promises'

class BaseRepository {
  constructor({ file }) {
    this.file = file
  }

  async find(itemId, prop = 'id') {
    const content = JSON.parse(await readFile(this.file, 'utf8'))
    if (itemId) {
      const result = content.find((el) => el[prop] === itemId)
      if (result) return result

      throw new Error(`${prop} não encontrado.`)
    }
    return content
  }

  async create(data, prop = 'id') {
    const content = JSON.parse(await readFile(this.file, 'utf8'))
    const hasItem = !!~content.findIndex((el) => el[prop] === data[prop])

    if (!hasItem) {
      content.push(data)
      await writeFile(this.file, JSON.stringify(content))
      return true
    }

    throw Error(`${prop} já está cadastro em nossa base de dados.`)
  }

  async update(itemId, data, prop = 'id') {
    const content = JSON.parse(await readFile(this.file, 'utf8'))
    const dataIndex = content.findIndex((el) => el[prop] === itemId)

    if (~dataIndex) {
      content[dataIndex] = data
      await writeFile(this.file, JSON.stringify(content))
      return true
    }

    throw new Error(`Nenhum ${prop} foi atualizado ou encontrado.`)
  }

  async destroy(itemId, prop = 'id') {
    const content = JSON.parse(await readFile(this.file, 'utf8'))
    const dataIndex = content.findIndex((el) => el[prop] === itemId)

    if (~dataIndex) {
      content.splice(dataIndex, 1)
      await writeFile(this.file, JSON.stringify(content))
      return true
    }

    throw new Error(`Nenhum ${prop} foi removido ou encontrado.`)
  }
}

export default BaseRepository
