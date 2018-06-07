const admin = require('firebase-admin')
admin.initializeApp()
const functions = require('firebase-functions')
const gcs = require('@google-cloud/storage')()
const path = require('path')
const sharp = require('sharp')
const stripe = require('stripe')(functions.config().stripe.token)
const cors = require('cors')({origin: true})
const _ = require('lodash')

/**
 * When an image is uploaded in the Storage bucket We generate a thumbnail automatically using
 * Sharp.
 */
exports.generateThumbnail = functions.storage.object().onFinalize((object) => {
  const THUMB_MAX_WIDTH = 600
  const THUMB_MAX_HEIGHT = 600

  const fileBucket = object.bucket // The Storage bucket that contains the file.
  const filePath = object.name // File path in the bucket.
  const contentType = object.contentType // File content type.

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.')
    return null
  }

  // Get the file name.
  const fileName = path.basename(filePath)
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_')) {
    console.log('Already a Thumbnail.')
    return null
  }

  // Download file from bucket.
  const bucket = gcs.bucket(fileBucket)

  const metadata = {
    contentType: contentType,
  }
  // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
  const thumbFileName = `thumb_${fileName}`
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName)
  // Create write stream for uploading thumbnail
  const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata})

  // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
  const pipeline = sharp()
  pipeline
    .resize(THUMB_MAX_WIDTH)
    .max()
    .pipe(thumbnailUploadStream)

  bucket.file(filePath).createReadStream().pipe(pipeline)

  const streamAsPromise = new Promise((resolve, reject) =>
    thumbnailUploadStream.on('finish', resolve).on('error', reject))

  return streamAsPromise.then(() => {
    console.log('Thumbnail created successfully')
    return null
  })
})

exports.preventFreeProducts = functions.firestore
.document('products/{productId}')
.onUpdate((change, context) => {
  const data = change.after.data()

  if (data.isActive) { // we are trying to set it to active. should we?
    return change.after.ref.set({
      isActive: data.price > 0 ? true : false
    }, {merge: true})
  }
})


exports.stripeCharge = functions.firestore
.document('orders/{orderId}')
.onWrite((change, context) => {
  const order = change.after.data()
  const orderId = context.params.orderId
  
  if (!order || order.charge) {
    console.log('This order has already been charged.')
    return
  }

  // ensure we don't charge unless we have complete customer info.

  return order.productRef.get()
    .then(p => p.data())
    .then(product => {
      const amount = parseFloat(product.price) * 100
      const currency = 'usd'
      const source = order.token.id
      const charge = {amount, currency, source}
      const idempotency_key = orderId

      return stripe.charges.create(charge, { idempotency_key })
    })
    .then(charge => {
      return admin.firestore().collection('orders').doc(orderId).set({charge}, {merge: true})
    })
    .catch(err => {
      console.error(err);
      return err
    })
})

exports.placeOrder = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(500).json({message: 'Not allowed'})
    }
    
    const customer = req.body.customer
    const token = req.body.token
    const productId = req.body.productId
    const address = req.body.address

    if (!_.every(['firstName', 'lastName', 'email'], _.partial(_.has, customer))) {
      console.error('Missing customer information')
      return res.status(400).json({message: 'Missing customer information'})
    }
    
    if (!_.every(['street', 'city', 'state', 'zipcode'], _.partial(_.has, address))) {
      console.error('Missing address information')
      return res.status(400).json({message: 'Missing address information'})
    }

    if (token.object !=='token') {
      console.error(req);
      return res.status(400).json({message: 'Missing payment token'})
    }

    if (customer && token && address && productId) {
      
      return admin.firestore().collection('products').doc(productId).get().then(productDoc => {
        if (productDoc.exists) {
          // check the product can be bought. stock level? is active? price is not zero?
          const product = productDoc.data();
          if (!(product.price > 0 && product.isActive && product.stock > 0)) {
            return res.status(500).json({message: 'This product is not purchasable'})
          }

          const order = {
            token,
            address,
            customer,
            productRef: productDoc._ref,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          }
    
          return admin.firestore().collection('orders').add(order)
          .then(orderDoc => {
            order.productRef.set({stock: product.stock-1}, {merge: true})
            return res.status(200).json({
              message: 'Order placed',
              order: {
                id: orderDoc.id
              }
            })
          })
          .catch(err => {
            console.error(err);
            return res.status(500).json({message: 'Order could not be placed'})
          })

        } else {
          return res.status(500).json({message: 'Product does not exist'})
        }
      }).catch(err => {
        console.error(err);
        return res.status(500).json({message: 'DB error'})
      })
    } else {
      console.error(err);
      return res.status(400).json({message: 'Missing information'})
    }
  })
})