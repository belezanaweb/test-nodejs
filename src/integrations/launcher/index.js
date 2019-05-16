const fs = require('fs')
const path = require('path')

const fn = async (basePath, name) => {
  const fullPath = path.resolve(`${basePath}/${name}`)
  let isExists = fs.existsSync(fullPath)

  if (!isExists) {
    throw new Error('LAUNCHER_NAME on process.env not found ' + fullPath)
  }

  if (isExists && name) {
    const fn = require(fullPath)
    if (typeof fn === 'function') {
      await fn()
    }
  }
}

module.exports = fn