import axios from 'axios'

import {
	getFileType
	// checkForExif
} from './tools'

const baseURL = 'https://storage.googleapis.com/'

// NOTE: in previous project the 2 below endpoints used different gcloud projects.  I believe the reason had to do with not getting the correct permissions from the client for getSignedUrl

export const uploadImageToBucket = ({ img, bucketFragmentName, fileName, fileType = 'image/jpeg' }) => {
	const region = 'us-central1'
	const cfBase = `https://${region}-${process.env.GOOGLE_CLOUD_PROJECT}.cloudfunctions.net`
	const bucketName = `${process.env.GOOGLE_CLOUD_PROJECT}-${bucketFragmentName}`
	// cfBase = process.env.NODE_ENV === 'production'
	// 		? `https://${region}-${process.env.GOOGLE_CLOUD_PROJECT}.cloudfunctions.net`
	// 		: 'http://localhost:8080'
	const getSignedUrlEndpoint = `${cfBase}/getSignedUrl`
	return new Promise((resolve, reject) => {
		const validation = _validate({ img, bucketName, getSignedUrlEndpoint, fileName })
		if (validation.error) return reject(console.error(validation.error)) // eslint-disable-line
		_getSignedUrl({ getSignedUrlEndpoint, bucketName, fileName, fileType })
			.then(result => {
				return _uploadToEndpoint({ img, fileType, signedURL: result.data })
			})
			.then(() => {
				resolve({
					fullURL: `${baseURL}${bucketName}/${fileName}`,
					fileName: fileName
				})
			})
			.catch(err => {
				reject(console.log('ERROR: ', err)) // eslint-disable-line
			})
	})
}

function _validate({ img, bucketName, getSignedUrlEndpoint, fileName }) {
	if (!img) return { error: 'must provide an image' }
	return 'success'
}

function _getSignedUrl({ getSignedUrlEndpoint, bucketName, fileName, fileType }) {
	return axios({
		method: 'POST',
		url: getSignedUrlEndpoint,
		data: {
			bucket: bucketName,
			filename: fileName,
			contentType: fileType
		}
	})
}

function _uploadToEndpoint({ img, fileType, signedURL }) {
	const axiosOptions = {
		method: 'PUT',
		url: signedURL,
		data: img,
		headers: {
			'Content-Type': fileType
		}
	}
	return axios(axiosOptions)
}

export const isImageSafe = function({ url }) {
	const region = 'us-central1'
	const cfBase = `https://${region}-${process.env.GOOGLE_CLOUD_PROJECT}.cloudfunctions.net`
	// cfBase = process.env.NODE_ENV === 'production' ? cfBase : 'http://localhost:8081'
	const safeImageEndPoint = `${cfBase}/safeImage`
	return new Promise((resolve, reject) => {
		axios({
			method: 'POST',
			url: safeImageEndPoint,
			data: { imageURL: url }
		})
			.then(response => {
				resolve(!_isUnsafe(response.data.results))
			})
			.catch(err => reject(err))
	})
}

export const detectFaces = function({ url }) {
	const region = 'us-central1'
	const cfBase = `https://${region}-${process.env.GOOGLE_CLOUD_PROJECT}.cloudfunctions.net`
	// cfBase = process.env.NODE_ENV === 'production' ? cfBase : 'http://localhost:8082'
	const faceDetectionEndPoint = `${cfBase}/faceAnnotator`
	return new Promise((resolve, reject) => {
		axios({
			method: 'POST',
			url: faceDetectionEndPoint,
			data: { imageURL: url }
		})
			.then(response => {
				resolve(response.data.results)
			})
			.catch(err => reject(err))
	})
}

function _isUnsafe(detections) {
	return detections.adult === 'VERY_LIKELY' || detections.adult === 'LIKELY'
}

const getFileNamePieces = file => {
	const hash = Date.now()
	const ext = file.name.split('.')[1]
	return {
		file,
		fileName: `${hash}_${file.name.split('.')[0]}.${ext}`
	}
}

export const fileUpload = async (e, bucketName) => {
	if (!e.target.files.length) {
		return { type: 'error', errorType: 'noFile', message: 'No file' }
	}

	const { file, fileName } = getFileNamePieces(e.target.files[0])
	const allowed = await getFileType({ file, allowedMimeTypes: ['image/jpeg', 'image/png'] })
	if (!allowed) {
		return { type: 'error', errorType: 'fileType', message: 'File type no authorized' }
	}

	let imageUploadResult
	try {
		imageUploadResult = await uploadImageToBucket({
			img: file,
			bucketFragmentName: bucketName || 'person-images',
			fileName: fileName,
			fileType: file.type
		})
	} catch (e) {
		return { type: 'error', errorType: 'network', message: e }
	}

	return { type: 'success', url: imageUploadResult.fullURL, file }
}
