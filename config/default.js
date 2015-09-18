import path from 'path';

let __root = (dir) => path.join(path.dirname(__dirname), dir);

export default Object.assign(require('../package.json'), {
    path: {
        client: __root('client'),
        static: __root('public'),
        view:__root('view')
    },
    proxy: {
        match: /^\/test/,
        host: 'http://piaofang.vip.sankuai.com'
    },
    debug: false
});
