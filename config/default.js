import path from 'path';

let __root = (dir) => path.join(path.dirname(__dirname), dir);

export default Object.assign(require('../package.json'), {
    path: {
        client: __root('client'),
        public: __root('public')
    },
    proxy: {
        match: /^\/test/,
        host: 'http://piaofang.vip.sankuai.com'
    },
    debug: false
});
