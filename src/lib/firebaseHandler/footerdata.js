import fbHandler from './index.js'

export const getFooterData = (language) => {
  if (!language) return Promise.reject(new Error('language is empty'))
  return fbHandler.getPathAsObject('/footerdata/' + language)
}

export const getFooterImages = () => {
  return fbHandler.getPathAsObject('/images/footerlogos')
}

export function updateFooterData(language, data) {
  if (!language) return Promise.reject(new Error('language is empty'))
  if (!data) return Promise.reject(new Error('data is empty'))

  return new Promise((resolve, reject) => {
    fbHandler.updateItem(data, '/footerdata/' + language)
      .then(() => {
        resolve()
      })
      .catch(() => {
        reject()
      })
  })
}