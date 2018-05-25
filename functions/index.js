const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

exports.generateThumbnail = functions.storage.object().onFinalize((object) => {
  const fileBucket = object.bucket
  const filePath = object.name
  const contentType = object.contentType
  const resourceState = object.resourceState
  const metageneration = object.metageneration;

  if (!contentType.startsWith('image/')) {
    // console.log('Not an image.')
    return null;
  }

  const fileName = path.basename(filePath)

  if (fileName.startsWith('thumb_')) {
    // console.log('Already a thumbnail')
    return null;
  }

  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };
  return bucket.file(filePath).download({
    destination: tempFilePath,
  }).then(() => {
    // console.log('Image downloaded locally to', tempFilePath);
    // Generate a thumbnail using ImageMagick.
    return spawn('convert', [tempFilePath, '-thumbnail', '600x', tempFilePath]);
  }).then(() => {
    // console.log('Thumbnail created at', tempFilePath);
    // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
    // Uploading the thumbnail.
    return bucket.upload(tempFilePath, {
      destination: thumbFilePath,
      metadata: metadata,
    });
    // Once the thumbnail has been uploaded delete the local file to free up disk space.
  }).then(() => fs.unlinkSync(tempFilePath));
})

exports.preventFreeProducts = functions.firestore
.document('products/{productId}')
.onUpdate((change, context) => {
  const data = change.after.data();

  if (data.isActive) { // we are trying to set it to active. should we?
    return change.after.ref.set({
      isActive: data.price > 0 ? true : false
    }, {merge: true});
  }
})