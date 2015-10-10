import path from 'path';

let __root = (dir) => path.join(path.dirname(__dirname), dir);

export default Object.assign(require('../package.json'), {
    path: {
        view: __root('view'),
        static:__root('static')
    },
    proxy: {
        match: /^\/proxy/,
        host: 'http://piaofang.vip.sankuai.com'
    },
    debug: true
});
