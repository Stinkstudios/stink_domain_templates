const video = (name, extraFields = null) => `${name}{
	${extraFields !== null ? extraFields + ',' : ''}
	_type,
	'source': lower(fieldSelector),
	autoPlay,
	controls,
	loop,
	muted,
	title,
	'asset': {
		fieldSelector == 'Vimeo' => {
			'videoId': toggleableVimeoVideo.videoId
		},
		fieldSelector == 'File' => {
			...toggleableFileVideo.mux.asset->
		},
	}
}`

export default video
