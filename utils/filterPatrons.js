export function filterPatrons(filterTerms) {
  const { data, searchTerm } = filterTerms
  const filteredData = data.filter((item) => {
    // Check if patronType matches the search term
    if (
      searchTerm.patronType !== 'any' &&
      item.patronType !== searchTerm.patronType
    ) {
      return false
    }

    // Check if surname matches the search term
    if (
      searchTerm.surname &&
      item.surname.toLowerCase().indexOf(searchTerm.surname.toLowerCase()) ===
        -1
    ) {
      return false
    }

    // Check if firstname matches the search term
    if (
      searchTerm.firstname &&
      item.firstname
        .toLowerCase()
        .indexOf(searchTerm.firstname.toLowerCase()) === -1
    ) {
      return false
    }

    // Check if barcode matches the search term
    if (searchTerm.barcode && item.barcode.indexOf(searchTerm.barcode) === -1) {
      return false
    }

    // If all search terms are empty or match, return true to keep the item in the filteredData
    return true
  })

  return filteredData
}
