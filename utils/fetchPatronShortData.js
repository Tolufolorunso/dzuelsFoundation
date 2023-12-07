const { default: fetchApi } = require('./fetchApi')

export async function fetchPatronShortData(barcode) {
  try {
    const res = await fetchApi(`/patrons/short-profile/${barcode}`)
    return res.patron
  } catch (error) {
    throw new Error(error.message)
  }
}
