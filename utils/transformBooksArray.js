const transformedArray = inputArray.map((item) => {
  const { barcode, title, author, classification, controlNumber, holdingsInformation } = item
  const transformedItem = {
    barcode: parseInt(barcode),
    title: title.mainTitle,
    author: author.mainAuthor,
    classification: parseInt(classification),
    controlNumber: parseFloat(controlNumber),
    holdingsInformation: parseInt(holdingsInformation)
  }
  return transformedItem
})
