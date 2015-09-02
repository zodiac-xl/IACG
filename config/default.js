import path from 'path';

const rootPath = path.dirname(__dirname);

export
default {
    path: {
        static: path.join(rootPath, 'static')
    },
    proxy: {
        match: /^\/test/,
        host: 'http://piaofang.vip.sankuai.com'
    }
};
