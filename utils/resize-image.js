import sharp from 'sharp'

async function resizeImage(imageBuffer, width, height, quality) {
  const image = await sharp(imageBuffer)
    .resize(width, height)
    .quality(quality)
    .toBuffer()

  return image
}

export default resizeImage
