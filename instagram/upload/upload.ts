import c from 'cloudinary'
import fs from 'fs'

const cloudinary = c.v2

const mediaPath = '../download/'

cloudinary.config({
  secure: true,
})

const mediaDirectories = fs
  .readdirSync(mediaPath, { withFileTypes: true })
  .filter((directoryEntry) => directoryEntry.isDirectory())
  .map((directoryEntry) => directoryEntry.name)

interface Media {
  path: string
  name: string
  mediaDirectory: string
}

const imagesToUpload: Media[] = []
const videosToUpload: Media[] = []

mediaDirectories.forEach((mediaDirectory) => {
  const pathToMedia = mediaPath + mediaDirectory
  const images = fs
    .readdirSync(pathToMedia, { withFileTypes: true })
    .filter((directoryEntry) => directoryEntry.name.includes('jpg'))
  images.forEach((image) =>
    imagesToUpload.push({
      path: pathToMedia + '/' + image.name,
      name: image.name.split('.')[0],
      mediaDirectory,
    })
  )

  const videos = fs
    .readdirSync(pathToMedia, { withFileTypes: true })
    .filter((directoryEntry) => directoryEntry.name.includes('mp4'))
  videos.forEach((video) =>
    videosToUpload.push({
      path: pathToMedia + '/' + video.name,
      name: video.name.split('.')[0],
      mediaDirectory,
    })
  )
})
console.log(cloudinary.config())
interface MediaMetaData {
  mediaDirectory: string
  url: string
  type: 'image' | 'video'
}

const mediaMetaData: MediaMetaData[] = []

// Uncomment this if you want to upload images:
// imagesToUpload.forEach(async (image, index) => {
//   console.log(`Uploading... ${index + 1}/${imagesToUpload.length}`)
//   const res = await cloudinary.uploader.upload(image.path, {
//     public_id: 'instagram/' + image.mediaDirectory + '/' + image.name,
//   })
// })
// videosToUpload.forEach(async (video, index) => {
//   console.log(`Uploading... ${index + 1}/${videosToUpload.length}`)
//   const res = await cloudinary.uploader.upload(video.path, {
//     public_id: 'instagram/' + video.mediaDirectory + '/' + video.name,
//     resource_type: 'video',
//   })
// })
const imageBaseUrl =
  'https://res.cloudinary.com/dvwkrskzv/image/upload/v1685997940/instagram/'
const videoBaseUrl =
  'https://res.cloudinary.com/dvwkrskzv/video/upload/v1685997940/instagram/'
imagesToUpload.forEach((image) =>
  mediaMetaData.push({
    mediaDirectory: image.mediaDirectory,
    url: imageBaseUrl + image.mediaDirectory + '/' + image.name,
    type: 'image',
  })
)

videosToUpload.forEach((video) =>
  mediaMetaData.push({
    mediaDirectory: video.mediaDirectory,
    url: videoBaseUrl + video.mediaDirectory + '/' + video.name,
    type: 'video',
  })
)

fs.writeFileSync('./imageMetaData.json', JSON.stringify(mediaMetaData, null, 2))

export {} // isolated modules error...
