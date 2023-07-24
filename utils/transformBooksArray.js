const transformedArray = inputArray.map((item) => {
  const { barcode, title, author, classification, controlNumber } = item
  const transformedItem = {
    barcode: parseInt(barcode),
    title: title.mainTitle,
    author: author.mainAuthor,
    classification: parseInt(classification),
    controlNumber: parseFloat(controlNumber),
  }
  return transformedItem
})
