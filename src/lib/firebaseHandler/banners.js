import fbHandler from './index.js'

function buildActions(country, actions) {
  return actions.map(_action => {
    const text = _action[country] ? _action[country].text : ''
    const title = _action[country] ? _action[country].title : ''
    return {
      action: _action.action,
      buttonClass: _action.buttonClass,
      rel: _action.rel,
      target: _action.target,
      visableTo: _action.visableTo,
      text: text,
      title: title
    }
  })
}

export const addBannerCommArea = (banner) => {
  return new Promise((resolve, reject) => {
    let newKey = fbHandler.getNewKey('/banners/commarea/')
    let _banner = { ...banner, key: newKey }

    var promises = [];
    promises.push(fbHandler.setItem(_banner, '/banners/commarea/' + newKey))

    Promise.all(promises).then(() => {
      resolve(_banner)
    })
  })
}

export const getBannerCommArea = (bannerKey) => {
  if (!bannerKey) return Promise.reject(new Error('bannerKey is empty'))
  return fbHandler.getPathAsObject('/banners/commarea/' + bannerKey)
}

export const getBannersCommArea = () => {
  return fbHandler.getPathAsArray('/banners/commarea')
}

export const updateBannerCommArea = (bannerKey, data) => {
  if (!bannerKey) return Promise.reject(new Error('bannerKey is empty'))
  if (!data) return Promise.reject(new Error('data is empty'))

  return new Promise((resolve, reject) => {
    fbHandler.updateItem(data, '/banners/commarea/' + bannerKey)
      .then(() => {
        resolve()
      })
      .catch(() => {
        reject()
      })
  })
}

export const publishBannerCommArea = (bannerKey, bannerData) => {
  if (!bannerKey) return Promise.reject(new Error('bannerKey is empty'))
  if (!bannerData) return Promise.reject(new Error('bannerData is empty'))

  return new Promise((resolve, reject) => {
    let promises = []

    fbHandler.getPathAsObject('/communicationarea/')
      .then(result => {

        let _banner = { ...bannerData }

        let collection = {}
        if (result) {
          collection = { ...result }
        }

        if (bannerData.active) {
          bannerData.countries.forEach(country => {
            let countryColl = collection[country] ? [...collection[country]] : []

            //Check if key exist
            let index = countryColl.findIndex(banner => banner.key === bannerData.key)

            /**
             * Copy provided data into new object
             */
            const desktopText = _banner.desktop.text && _banner.desktop.text[country] ? _banner.desktop.text[country] : null
            const mobileText = _banner.desktop.text && _banner.desktop.text[country] ? _banner.desktop.text[country] : null

            let desktopActions = []
            if (_banner.desktop.actions) {
              desktopActions = buildActions(country, _banner.desktop.actions)
            }

            let mobileActions = []
            if (_banner.mobile.actions) {
              mobileActions = buildActions(country, _banner.mobile.actions)
            }

            let newObject = {
              key: _banner.key,
              desktop: {
                videoUrl: _banner.desktop.details.videoUrl,
                imageUrl: _banner.desktop.details.imageUrl,
                headerColor: _banner.desktop.details.headerColor,
                subHeaderColor: _banner.desktop.details.subHeaderColor,
                header: {
                  text: desktopText ? desktopText.header.text : '',
                  size: desktopText ? desktopText.header.size : '',
                },
                subHeader: {
                  text: desktopText ? desktopText.subHeader.text : '',
                  size: desktopText ? desktopText.subHeader.size : '',
                },
                actions: desktopActions
              },
              mobile: {
                videoUrl: _banner.mobile.details.videoUrl,
                imageUrl: _banner.mobile.details.imageUrl,
                headerColor: _banner.mobile.details.headerColor,
                subHeaderColor: _banner.mobile.details.subHeaderColor,
                header: {
                  text: mobileText ? mobileText.header.text : '',
                  size: mobileText ? mobileText.header.size : '',
                },
                subHeader: {
                  text: mobileText ? mobileText.subHeader.text : '',
                  size: mobileText ? mobileText.subHeader.size : '',
                },
                actions: mobileActions
              }
            }

            /**
             * Add Banner
             * Add to collection if key do not exist
             */
            if (index === -1) {
              countryColl = countryColl.concat(newObject)
            }

            /**
             * Update Banner
             * Search through published banners and update if key found
             */
            else if (index >= 0) {
              countryColl[index] = { ...newObject }
            }

            //add promise
            promises.push(fbHandler.setItem(countryColl, '/communicationarea/' + country))
          })
        }


        /**
         * Remove
         * Search through published banners and remove if necessary
         */
        Object.keys(collection).forEach(country => {
          let countryColl = [...collection[country]] || []
          let index = countryColl.findIndex(banner => banner.key === _banner.key)
          if (index >= 0) {
            if (!bannerData.active) {
              //remove from collection
              countryColl.splice(index, 1)
              promises.push(fbHandler.setItem(countryColl, '/communicationarea/' + country))
            } else {
              //remove if found in not selected countries
              const notSelected = _banner.countries.indexOf(country) === -1
              if (notSelected) {
                countryColl.splice(index, 1)
                promises.push(fbHandler.setItem(countryColl, '/communicationarea/' + country))
              }
            }
          }
        })

        //Run promises
        Promise.all(promises).then(() => {
          resolve()
        })
      })
      .catch(err => reject(err))
  })
}

export const getPublishedBannersCommArea = (country) => {
  if (!country) return Promise.reject(new Error('country is empty'))
  return fbHandler.getPathAsArray('/communicationarea/' + country)
}

export const updatePublishedBannersCommArea = (country, collection) => {
  if (!country) return Promise.reject(new Error('country is empty'))
  if (!collection) return Promise.reject(new Error('collection is empty'))

  return new Promise((resolve, reject) => {
    fbHandler.setItem(collection, '/communicationarea/' + country)
      .then((result) => {
        resolve()
      })
      .catch(() => {
        reject()
      })
  })
}