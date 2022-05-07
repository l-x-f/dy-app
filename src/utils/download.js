/**
 * @description 下载文件
 * @param data
 * @param filename
 * @param options
 */
const download = (data, filename = '', options) => {
  return new Promise((resolve, reject) => {
    if (!data) {
      return reject()
    }
    let name = filename
    if (typeof data === 'string' && !filename) {
      name = data.slice(data.lastIndexOf('/') + 1)
    }
    import('file-saver')
      .then(({ default: FileSaver }) => {
        FileSaver.saveAs(data, +new Date() + '-' + name, options)
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default download
