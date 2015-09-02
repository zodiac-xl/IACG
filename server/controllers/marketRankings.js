import Controller from '../controller';

export
default class marketRankingsController extends Controller {

    * index() {
        const self = this;
        const tableCls = ['day-market', 'week-market', 'month-market'];

        let queryInfo = self.queryInfo();
        let tabIndex = queryInfo.tab || 0;

        let aApi = [
            `/market/rank/dailybox.json`,
            `/market/rank/weeklyBox.json`,
            `/market/rank/monthlyBox.json`
        ];

        let resBody = (
            yield self.api([
                aApi[tabIndex]
            ]).get())[0].res.body;

        function getRanking() {
            let arr = resBody.updateTime.split(' ')[0].split('-');
            let aTitle = [`大盘单日票房排行榜`, `大盘单周票房排行榜`, `大盘单月票房排行榜`]
            return {
                title: aTitle[tabIndex],
                desc: `截至${arr[0]}年${arr[1]}月${arr[2]}日`
            };
        }

        function getTab() {
            let ret = [{
                text: '单日票房'
            }, {
                text: '单周票房'
            }, {
                text: '单月票房'
            }];

            ret[tabIndex].active = true;

            return ret;
        }

        function getData() {
            let ret = resBody.data.concat();

            ret.forEach(function(e, i) {
                let tmp = e.date.split(' ');

                e.ranking = i + 1;

                e.showDateFormat = [
                    `<p>${tmp[0]}</p><p>${tmp[1]}</p>`,
                    `<p>${tmp[0]}</p><p>至</p><p>${tmp[1]}</p>`,
                    `<p>${tmp[0]}</p>`
                ][tabIndex];
            });

            return ret;
        }

        function getDate() {
            let arr = resBody.updateTime.split(' ')[0].split('-');

            return `${arr[0]}年${arr[1]}月${arr[2]}日`;
        }

        if (self.ctx.ajax) {
            self.send({
                totalBox: yield self.renderView('../partials/totalBox', {
                    ranking: getRanking()
                }),
                marketList: yield self.renderView(`../partials/marketList`, {
                    data: getData(),
                    tableCls: tableCls[tabIndex],
                    marketType: getTab()[tabIndex]['text']
                })
            });
        } else {
            yield self.render('marketRankings', self.mergeModel({
                tabIndex: tabIndex,
                tabItems: getTab(),
                marketType: getTab()[tabIndex]['text'],
                ranking: getRanking(),
                data: getData(),
                tableCls: tableCls[tabIndex]
            }));
        }

    }
}
