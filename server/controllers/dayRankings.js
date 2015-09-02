import Controller from '../controller';

export
default class DayRankingsController extends Controller {

    * index() {
        const self = this;

        let queryInfo = self.queryInfo();
        let tabIndex = queryInfo.tab || 0;

        let aApi = [
            `/dailyBox/singleDay/list.json`,
            `/dailyBox/firstReleaseDate/list.json`,
        ];

        let resBody = (yield self.api([
            aApi[tabIndex]
        ]).get())[0].res.body;

        function getTab() {
            let ret = [{
                text: '单日票房'
            }, {
                text: '首日票房'
            }];

            ret[tabIndex].active = true;

            return ret;
        }

        function getRanking() {
            let arr = resBody.updateTime.split(' ')[0].split('-');

            return {
                title: tabIndex == 0 ? `影片单日票房排行榜` : `影片首日票房排行榜`,
                desc: `截至${arr[0]}年${arr[1]}月${arr[2]}日`
            };
        }

        function getData() {
            let ret = resBody.data.concat();

            ret.forEach(function(e, i) {
                let tmp = e.showDate.split(' ');

                e.showDateDay = tmp[0];
                e.showDateWeek = tmp[1];
                e.ranking = i + 1;
            });

            return ret;
        }

        if (self.ctx.ajax) {
            self.send({
                totalBox: yield self.renderView('../partials/totalBox', {
                    ranking: getRanking()
                }),
                dayList: yield self.renderView(`../partials/dayList${tabIndex}`, {
                    data: getData()
                })
            });
        } else {
            yield self.render('dayRankings', self.mergeModel({
                tabIndex:tabIndex,
                isFirst: tabIndex == 0,
                tabItems: getTab(),
                ranking: getRanking(),
                data: getData()
            }));
        }

    }
}
