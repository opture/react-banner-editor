import fbHandler from './index.js'

export const getLicenseText = (countryCode) => {
  if (!countryCode) return Promise.reject(new Error('Countrycode is empty'))
  return fbHandler.getPathAsObject('/licensetext/' + countryCode)
}

export function updateLicenseText(countryCode, text) {
  if (!countryCode) return Promise.reject(new Error('Countrycode is empty'))
  if (!text) return Promise.reject(new Error('text is empty'))

  let object = {
    [countryCode]: text
  }

  return new Promise((resolve, reject) => {
    fbHandler.updateItem(object, '/licensetext/')
      .then(() => {
        resolve()
      })
      .catch(() => {
        reject()
      })
  })
}