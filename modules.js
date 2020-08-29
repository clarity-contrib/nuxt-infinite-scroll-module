// module.js
const { resolve, join } = require('path')

export default function(moduleOptions){
    this.addPlugin({
        src: resolve(__dirname, 'components/index.js'),
        fileName: join('infinitescroll', 'components/index.js')
    })

    this.addTemplate({
        src: resolve(__dirname, 'components/lib/InfiniteScroll.vue'),
        fileName: join('infinitescroll', 'components/lib/InfiniteScroll.vue')
    })
}

module.exports.meta = require('./package.json')