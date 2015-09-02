import Controller from '../controller';

export
default class YearRankingsController extends Controller {

    * index() {
        const self = this;
        const startYear = 2011;
        const curYear = new Date().getFullYear();

        let queryInfo = self.queryInfo();
        let tabIndex = queryInfo.tab || 0;
        let aTab = [], aYears = [];

        for (let i = startYear; i <= curYear; i++) {
            aTab.unshift(i);
            aYears.unshift({
                text: `${i}年`
            });
        }

        aTab.unshift(0);
        aYears.unshift({
            text: '全部'
        });

        for (let i = 0; i < aYears.length; i++) {
            if (i == tabIndex) {
                aYears[i].active = true;
            }
        }

        let params = queryInfo.year === undefined ? {
            year: aTab[tabIndex],
            limit: 100
        } : queryInfo;

        let resBody = (
            yield self.api([
                `/yearlyBox/list.json`,
            ]).get(params))[0].res.body;

        function getRanking() {
            let year = resBody.year;
            let date = resBody.updateTime.split(' ')[0].split('-');
            let sumBox = resBody.sumBox;

            let title, desc;

            if (year === 0) {
                title = '中国电影票房总榜';
                desc = `截至${date[0]}年${date[1].replace(/^0/,'')}月${date[2]}日`;
            } else if (year === curYear) {
                title = `${year}年票房排行榜`;
                desc = `截至${date[1].replace(/^0/,'')}月${date[2]}日 总票房${sumBox}元`;
            } else {
                title = `${year}年票房排行榜`;
                desc = `总票房${sumBox }元`;
            }

            return {
                title: title,
                desc: desc
            };
        }

        function getData() {
            let ret = resBody.data.concat();
            let rDate = /(\d{4})(\d{2})(\d{2})/g;

            ret.forEach(function(e, i) {
                e.ranking = i + 1;
                e.showDateFormat = (`${e.showDate} 上映`).replace(rDate, function($0, $1, $2, $3) {
                    return `${$1}-${$2}-${$3}`;
                });
            });

            return ret;
        }

        if (self.ctx.ajax) {
            self.send({
                totalBox: yield self.renderView('../partials/totalBox', {
                    year: aYears,
                    ranking: getRanking()
                }),
                yearList: yield self.renderView('../partials/yearList', {
                    data: getData()
                })
            });
        } else {
            yield self.render('yearRankings', self.mergeModel({
                tabIndex:tabIndex,
                year: aYears,
                ranking: getRanking(),
                data: getData()
            }));
        }
    }
}
