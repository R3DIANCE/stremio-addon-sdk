#!/usr/bin/env node
const { addonBuilder, serveHTTP } = require('../')

const builder = new addonBuilder({
	id: 'org.myexampleaddon',
	version: '1.0.0',

	name: 'R3DIANCE',

	// Properties that determine when Stremio picks this add-on
	// this means your add-on will be used for streams of the type movie
	catalogs: [],
	resources: ['stream'],
	types: ['movie'],
})

// takes function(type, id, cb)
builder.defineStreamHandler(function(args) {
	if (args.type === 'movie' && args.id === 'tt1254207') {
		// serve one stream to big buck bunny
		const stream = { url: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4' }
		return Promise.resolve({ streams: [stream] })
	} else {
		// otherwise return no streams
		return Promise.resolve({ streams: [] })
	}
})

serveHTTP(builder.getInterface(), { port: 43001 })
publishToCentral("https://r3diance.herokuapp.com//manifest.json") // <- invoke this if you want to publish your add-on and it's accessible publically on "your-domain"
