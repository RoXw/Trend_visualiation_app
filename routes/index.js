var request = require("request");

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('/index.ejs');
    });
    app.get('/:category', function(req, res) {
        var options = {};
        options.uri = 'http://localhost:8080/' + req.params.category;
        options.method = "GET";
        res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
          res.setHeader('Content-Type', 'application/json');
          
          // res.send({"statusCode":200,"body":"[\"nike\", \"meetup\", \"owen\", \"wtb\", \"holi\", \"wts\", \"adidas\", \"buscemi\", \"max\", \"yeezy\", \"oreo\", \"crockett\", \"santalum\", \"adv\", \"wht\", \"vachetta\", \"unboxing\", \"ebay\", \"lowest\", \"zeb\", \"infared\", \"eqt\", \"saucony\", \"gyw\", \"flyknit\", \"saturday\", \"burgundy\", \"jones\", \"captoe\", \"oxford\", \"truman\", \"obo\", \"ggdb\", \"maryam\", \"cindy\"]","headers":{"date":"Sun, 15 Apr 2018 09:28:37 GMT","server":"WSGIServer/0.2 CPython/3.6.4","content-length":"324","content-type":"text/html; charset=UTF-8"},"request":{"uri":{"protocol":"http:","slashes":true,"auth":null,"host":"localhost:8080","port":"8080","hostname":"localhost","hash":null,"search":null,"query":null,"pathname":"/shoes","path":"/shoes","href":"http://localhost:8080/shoes"},"method":"GET","headers":{}}});

          // return;
        request(options, function(err, httpResponse, body){
          res.send(httpResponse);
        });
    });

    app.get('/:category/:brand', function(req, res) {
        var options = {};
        options.uri = 'http://localhost:8080/' + req.params.category + "/" + req.params.brand;
        options.method = "GET";
        res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
        res.setHeader('Content-Type', 'application/json');
        
        // res.send({"statusCode":200,"body":"[{\"key\":1396310400000,\"nike\":73.25,\"trend\":60.1153846154,\"seasonal\":2.1781619822,\"date\":\"2014-04-01\"},{\"key\":1398902400000,\"nike\":67.75,\"trend\":61.03125,\"seasonal\":-1.4985207101,\"date\":\"2014-05-01\"},{\"key\":1401580800000,\"nike\":72.8,\"trend\":62.4326923077,\"seasonal\":-0.741068787,\"date\":\"2014-06-01\"},{\"key\":1404172800000,\"nike\":70.75,\"trend\":64.0889423077,\"seasonal\":-0.5514053254,\"date\":\"2014-07-01\"},{\"key\":1406851200000,\"nike\":72.2,\"trend\":65.2057692308,\"seasonal\":2.2536427515,\"date\":\"2014-08-01\"},{\"key\":1409529600000,\"nike\":67.5,\"trend\":66.2644230769,\"seasonal\":-2.2076553254,\"date\":\"2014-09-01\"},{\"key\":1412121600000,\"nike\":64.5,\"trend\":67.1706730769,\"seasonal\":-4.5087370562,\"date\":\"2014-10-01\"},{\"key\":1414800000000,\"nike\":69.4,\"trend\":67.9692307692,\"seasonal\":2.6036427515,\"date\":\"2014-11-01\"},{\"key\":1417392000000,\"nike\":75.25,\"trend\":68.8341346154,\"seasonal\":6.2028014053,\"date\":\"2014-12-01\"},{\"key\":1420070400000,\"nike\":70.75,\"trend\":69.6418269231,\"seasonal\":-3.9510447485,\"date\":\"2015-01-01\"},{\"key\":1422748800000,\"nike\":71.0,\"trend\":70.3557692308,\"seasonal\":-4.0447947485,\"date\":\"2015-02-01\"},{\"key\":1425168000000,\"nike\":78.0,\"trend\":70.9288461538,\"seasonal\":2.5887389053,\"date\":\"2015-03-01\"},{\"key\":1427846400000,\"nike\":76.5,\"trend\":71.40625,\"seasonal\":2.1781619822,\"date\":\"2015-04-01\"},{\"key\":1430438400000,\"nike\":73.0,\"trend\":71.7653846154,\"seasonal\":-1.4391457101,\"date\":\"2015-05-01\"},{\"key\":1433116800000,\"nike\":71.25,\"trend\":71.8341346154,\"seasonal\":-0.6259245562,\"date\":\"2015-06-01\"},{\"key\":1435708800000,\"nike\":74.0,\"trend\":71.8389423077,\"seasonal\":-0.5514053254,\"date\":\"2015-07-01\"},{\"key\":1438387200000,\"nike\":77.8,\"trend\":72.2653846154,\"seasonal\":2.2536427515,\"date\":\"2015-08-01\"},{\"key\":1441065600000,\"nike\":74.5,\"trend\":72.8798076923,\"seasonal\":-2.2076553254,\"date\":\"2015-09-01\"},{\"key\":1443657600000,\"nike\":73.25,\"trend\":73.4158653846,\"seasonal\":-4.5087370562,\"date\":\"2015-10-01\"},{\"key\":1446336000000,\"nike\":78.8,\"trend\":74.1596153846,\"seasonal\":2.6036427515,\"date\":\"2015-11-01\"},{\"key\":1448928000000,\"nike\":84.5,\"trend\":75.0456730769,\"seasonal\":6.2028014053,\"date\":\"2015-12-01\"},{\"key\":1451606400000,\"nike\":74.4,\"trend\":75.575,\"seasonal\":-3.8742418639,\"date\":\"2016-01-01\"},{\"key\":1454284800000,\"nike\":76.25,\"trend\":75.9230769231,\"seasonal\":-3.1337370562,\"date\":\"2016-02-01\"},{\"key\":1456790400000,\"nike\":83.0,\"trend\":76.2235576923,\"seasonal\":3.2166235207,\"date\":\"2016-03-01\"},{\"key\":1459468800000,\"nike\":79.0,\"trend\":76.5528846154,\"seasonal\":2.1781619822,\"date\":\"2016-04-01\"},{\"key\":1462060800000,\"nike\":74.4,\"trend\":76.6365384615,\"seasonal\":-1.4391457101,\"date\":\"2016-05-01\"},{\"key\":1464739200000,\"nike\":74.0,\"trend\":76.8485576923,\"seasonal\":-0.6259245562,\"date\":\"2016-06-01\"},{\"key\":1467331200000,\"nike\":74.4,\"trend\":76.9634615385,\"seasonal\":-0.1112610947,\"date\":\"2016-07-01\"},{\"key\":1470009600000,\"nike\":75.5,\"trend\":76.8798076923,\"seasonal\":2.4047244822,\"date\":\"2016-08-01\"},{\"key\":1472688000000,\"nike\":71.0,\"trend\":76.5384615385,\"seasonal\":-2.2076553254,\"date\":\"2016-09-01\"},{\"key\":1475280000000,\"nike\":69.4,\"trend\":76.3211538462,\"seasonal\":-4.5208764793,\"date\":\"2016-10-01\"},{\"key\":1477958400000,\"nike\":80.0,\"trend\":76.0889423077,\"seasonal\":4.3969119822,\"date\":\"2016-11-01\"},{\"key\":1480550400000,\"nike\":80.5,\"trend\":75.9230769231,\"seasonal\":6.2028014053,\"date\":\"2016-12-01\"},{\"key\":1483228800000,\"nike\":68.0,\"trend\":75.4769230769,\"seasonal\":-3.8742418639,\"date\":\"2017-01-01\"},{\"key\":1485907200000,\"nike\":68.0,\"trend\":74.7956730769,\"seasonal\":-3.1337370562,\"date\":\"2017-02-01\"},{\"key\":1488326400000,\"nike\":75.0,\"trend\":74.2067307692,\"seasonal\":3.2166235207,\"date\":\"2017-03-01\"},{\"key\":1491004800000,\"nike\":71.8,\"trend\":73.5788461538,\"seasonal\":2.0502773669,\"date\":\"2017-04-01\"},{\"key\":1493596800000,\"nike\":66.5,\"trend\":73.0,\"seasonal\":-2.1836168639,\"date\":\"2017-05-01\"},{\"key\":1496275200000,\"nike\":67.75,\"trend\":72.4495192308,\"seasonal\":-0.6259245562,\"date\":\"2017-06-01\"},{\"key\":1498867200000,\"nike\":71.0,\"trend\":72.0403846154,\"seasonal\":-0.1112610947,\"date\":\"2017-07-01\"},{\"key\":1501545600000,\"nike\":75.25,\"trend\":71.8725961538,\"seasonal\":2.4047244822,\"date\":\"2017-08-01\"},{\"key\":1504224000000,\"nike\":71.5,\"trend\":71.9086538462,\"seasonal\":-2.2076553254,\"date\":\"2017-09-01\"},{\"key\":1506816000000,\"nike\":69.6,\"trend\":71.8557692308,\"seasonal\":-4.5208764793,\"date\":\"2017-10-01\"},{\"key\":1509494400000,\"nike\":82.75,\"trend\":72.0456730769,\"seasonal\":4.3969119822,\"date\":\"2017-11-01\"},{\"key\":1512086400000,\"nike\":80.0,\"trend\":72.1730769231,\"seasonal\":4.5358542899,\"date\":\"2017-12-01\"},{\"key\":1514764800000,\"nike\":69.75,\"trend\":72.3822115385,\"seasonal\":-4.309818787,\"date\":\"2018-01-01\"},{\"key\":1517443200000,\"nike\":71.0,\"trend\":72.5961538462,\"seasonal\":-3.1337370562,\"date\":\"2018-02-01\"},{\"key\":1519862400000,\"nike\":76.0,\"trend\":72.7163461538,\"seasonal\":3.2166235207,\"date\":\"2018-03-01\"},{\"key\":1522540800000,\"nike\":75.5,\"trend\":72.7740384615,\"seasonal\":1.9654215976,\"date\":\"2018-04-01\"}]","headers":{"date":"Sun, 15 Apr 2018 09:28:39 GMT","server":"WSGIServer/0.2 CPython/3.6.4","content-length":"4913","content-type":"text/html; charset=UTF-8"},"request":{"uri":{"protocol":"http:","slashes":true,"auth":null,"host":"localhost:8080","port":"8080","hostname":"localhost","hash":null,"search":null,"query":null,"pathname":"/shoes/nike","path":"/shoes/nike","href":"http://localhost:8080/shoes/nike"},"method":"GET","headers":{}}});

        // return;
        request(options, function(err, httpResponse, body){

          res.send(httpResponse);
        });
    });
};