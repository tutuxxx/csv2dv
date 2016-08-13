# csv2dv

数据可视化作为大数据应用的一个分支,随着大数据时代的到来得到了飞速发展。而在数据可视化过程中，我们时常面临这样的问题：

*   拿到的分析结果数据并不是前端要用的Json或Array格式？
*   空间数据的坐标系和可视化的坐标系不匹配？
*   数据量过大，无法在浏览器端用JS脚本转换？
*   作为一名Jser，不想用别的语言，又想自己搞定？

#### 额～～还好我们有Node，Node大法好！

>`csv2dv`主要用于将csv数据转换成一些常见的可视化数据格式，并提供BD09（百度坐标系）、WGS84(GPS坐标系)、GCJ02(国测局坐标系)三种坐标系的互转。
>>`常见地图坐标系科普`：谷歌地图、OpenStreetMap、BingMap采用的是WGS84地理坐标系（谷歌中国范围除外），谷歌中国地图、搜搜中国地图、高德地图采用的是GCJ02地理坐标系，百度采用的是BD09坐标系，天地图采用的是cgcs2000（国家大地坐标），而设备一般包含GPS芯片或者北斗芯片获取的经纬度为WGS84地理坐标系。*

## 贡献内容

如果你想参与csv2dv的共同创作，修改或添加内容，可以先[Fork](https://github.com/tutuxxx/csv2dv)本仓库，然后将修改的内容提交[Pull requests](https://github.com/tutuxxx/csv2dv/pulls)；或者[创建Issues](https://github.com/tutuxxx/csv2dv/issues/new)。

## 安装

csv2dv是基于node.js的所以先要安装node.js, 推荐您使用最新版本的node.js，如果具体使用过程中遇到问题也可以[在此反馈](https://github.com/tutuxxx/csv2dv/issues/new)；具体安装步骤如下：

1. 安装[node.js](https://nodejs.org), 建议您采用最新版本的 node.js;
2. 安装csv2dv：
       *  如果您想贡献内容，请[Fork](https://github.com/tutuxxx/csv2dv)本仓库；
       *  如果您只想使用，请clone本仓库；
       *  如果您不是开发人员，只想简单使用数据转换功能，请[下载](https://github.com/tutuxxx/csv2dv/archive/master.zip)仓库到本地；
3. 安装csv2dv的依赖：
       1. 命令行进入csv2dv；
       2. 命令行中运行npm install命令安装csv2dv依赖的node模块；
       
## 使用

1. 选择放置您的csv文件；

2. 设置参数，进入csv2dv/src打开main.js：
```
    csv2dv.start(oFilePath,dFilePath,type);
```
参数说明:
    *  `oFilePath`：csv文件，如：'./data-source/source-data'，csv文件中都要列名，具体列名保持与操作类型中的输入格式一致，列顺序不需一致；
    *  `dFilePath`：输出文件，如：'./data-result/result-data'；
    *  `type`：要进行的操作类型，如：'geoData'；
        type可选的值：
        * `geoData` 
                echarts配合百度地图做炫光图时所用的地理数据
                输入格式：id,lng,lat
                输出格式：{id:[lng,lat],id:{}..}
        * `pointValue`
                echarts配合百度地图做炫光图时所用的属性数据
                输入格式：id,value
                输出格式：[{name:id,value:value},{}]
        * `odData`
                echarts配合百度地图做迁徙图时所用的数据
                输入格式：Oid,Did,value
                输出格式：[[{"name":Oid},{"name":Did,"value":value}],]
        * `routeData`
                mapv轨迹动画所需的数据格式,count表示从第几个点开始动画
                输入：id,lng,lat     （同id的记录要连在一起）
                输出：[{geo:[[lng,lat],[]],count:0}]
        * `gcj2wgs`、`wgs2gcj`、`gcj2bd`、`wgs2bd`、`bd2gcj`
                坐标系转换
                输入：id,lng,lat
                输出：id,lng,lat
        * `bHeatMap`
                百度地图添加热力图
                输入：id,lng,lat,value
                输出：[{lng:lng,lat:lat,count:value}]
                
3. 设置完参数后命令行进入csv2dv/src中运行命令：
```
    node main.js
```

4. 如果看到命令行中输出如下内容，就表示转换成功啦！
```
    finished.....haha....
```

本工具会持续更新，争取做成导入csv文件即可实现可视化的SaaS应用。期待～～
