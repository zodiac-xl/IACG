import url from 'url';
import raven from 'raven';

export
default

function(options) {
    if (!options) throw new Error('[sentry] must config sentry first .');
    let u = url.parse(options.api);
    u.auth = [options.appId, options.appSecret].join(':');
    let client = new raven.Client(url.format(u));
    return function* sentry(next) {
        try {
            yield next;
        } catch (err) {
            if (!options.disable) client.captureError(err);
            throw err;
        }
    };
}
