var csv2dv = require('../lib/csv2dv');

/**
 * para:源文件，输出文件，要转换的数据类型（geoData,routeData,pointValue,odData,gcj2wgs,wgs2gcj,gcj2bd,wgs2bd,bd2gcj,bHeatMap）
 */

csv2dv.start('../data-source/source-data', '../data-result/result-data', 'geoData');




