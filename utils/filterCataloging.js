export function filterCataloging(filterTerms) {
  const { data, searchTerm } = filterTerms
  const filteredData = data.filter((item) => {
    if (
      searchTerm.author &&
      item.author.toLowerCase().indexOf(searchTerm.author.toLowerCase()) === -1
    ) {
      return false
    }

    if (
      searchTerm.title &&
      item.title.toLowerCase().indexOf(searchTerm.title.toLowerCase()) === -1
    ) {
      return false
    }

    if (
      searchTerm.controlNumber &&
      item.controlNumber.indexOf(searchTerm.controlNumber) === -1
    ) {
      return false
    }

    if (
      searchTerm.classification &&
      item.classification.indexOf(searchTerm.classification) === -1
    ) {
      return false
    }

    if (searchTerm.barcode && item.barcode.indexOf(searchTerm.barcode) === -1) {
      return false
    }

    // If all search terms are empty or match, return true to keep the item in the filteredData
    return true
  })

  return filteredData
}
