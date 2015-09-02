import request from 'superagent';
import thunkify from 'thunkify';
import config from 'config';
import uri from 'url';

request.Request.prototype.thunkify = thunkify(request.Request.prototype.end);

export
default class Controller {

    * render(view, locals) {
        yield this.ctx.render(view, locals);
    }

    * renderView(view, locals) {
        return yield this.ctx.renderView(view, locals);
    }

    send(body) {
        this.ctx.body = body;
    }

    api(urls, options = {
        api: config.host.api
    }) {
        let _get = thunkify(request.get);
        urls = urls.map((url) => {
            return `${options.api}${url}`;
        });
        return {
            get: function*(query) {
                return yield urls.map((url) => {
                    let urlObj = uri.parse(url);
                    urlObj.query = query;
                    return _get(uri.format(urlObj));
                });
            }
        };
    }

    queryInfo() {
        let urlObj = uri.parse(this.ctx.request.url, true);
        return urlObj.query;
    }

    mergeModel(json) {
        let ua = this.ctx.ua;
        let isDev = this.ctx.env == 'development';
        let truckify;

        if (isDev) {
            truckify = {
                map: {}
            };
        } else {
            truckify = require('./middlewares/truckify');
        }

        Object.assign(json, {
            rt: Date.now(),
            isDev: isDev,
            truckify: truckify,
            resoucePath: config.resoucePath,
            isPro: ua.isAndPro || ua.isIosPro
        });

        return json;
    }

}
