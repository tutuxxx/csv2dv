/**
 * Created by ysj on 16/7/19
 */
var fs = require('fs');
var csv = require('..');
var geoTransform = require('./geoTransform');

var csv2dv = {
    oFilePath: '',
    dFilePath: '',
    dealType: '',
    coordType: ["gcj2wgs", "wgs2gcj", "gcj2bd", "wgs2bd", 'bd2gcj'],
    parser: csv.parse({delimiter: ',', columns: true}, function (err, data) {
        var resJson = csv2dv.dealData(data, csv2dv.dealType);
        resJson && csv2dv.write(resJson);
    }),
    start: function (op, dp, type) {
        this.oFilePath = op;
        this.dFilePath = dp;
        this.dealType = type;
        fs.createReadStream(this.oFilePath).pipe(this.parser);
    },
    write: function (result) {
        if (this.coordType.indexOf(this.dealType) > -1) {
            var resultStr = result;
        } else {
            var resultStr = 'var ' + this.dealType + '=' + JSON.stringify(result) + ';';
        }
        fs.writeFile(this.dFilePath, resultStr, function (err) {
            if (err) throw err;
            console.log('finished.....haha....');
        });
    },
    dealData: function (data, dealType) {
        if (this.dealType == 'geoData') {
            var result = {};
            for (var i = 0; i < data.length; i++) {
                var coord = [parseFloat(data[i].lng), parseFloat(data[i].lat)];
                result[data[i].id] = coord;
            }
            return result;
        } else if (this.dealType == 'routeData') {
            var lastTaxi = data[0].id;//记录上一辆车
            var temp = {"geo": [], "count": 0};
            var n = 0;//限制结果中车的数量
            var result = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == lastTaxi) {
                    var point = [data[i].lng, data[i].lat];
                    temp.geo.push(point);
                } else {
                    result.push(temp);
                    n++;
                    lastTaxi = data[i].id;
                    temp = {"geo": [[data[i].lng, data[i].lat]], "count": 0};
                }
                if (i == data.length - 1) {
                    result.push(temp);
                }
            }
            console.log('共生成' + result.length + '条轨迹!');
            return result;
        } else if (this.dealType == "pointValue") {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                result.push({name: data[i].id, value: data[i].value});
            }
            return result;
        } else if (this.dealType == "odData") {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var temp = [];
                var o = {
                    name: data[i].Oid
                };
                var d = {
                    name: data[i].Did,
                    value: data[i].value
                };
                temp.push(o);
                temp.push(d);
                result.push(temp);
            }
            return result;
        } else if (this.coordType.indexOf(this.dealType) > -1) {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                var coord = eval('geoTransform.' + this.dealType + '(' + data[i].lng + ',' + data[i].lat + ')');
                result = result + data[i].id + ',' + coord[0] + ',' + coord[1] + '\n';
            }
            return result;
        } else if (this.dealType == 'bHeatMap') {
            var result = [];
            for (var i = 0; i < data.length; i++) {
                var item={lng:data[i].lng,lat:data[i].lat,count:parseInt(data[i].value)};
                result.push(item);
            }
            return result;
        } else {
            conso.e
            console.log('您输入的参数有误！');
            return;
        }
    }
}

module.exports = csv2dv;




