demoApp.controller('MainController', ['$scope', '$filter', '$http', function ($scope, $filter, $http) {
    $scope.categories = ['shoes', 'toys'];

    $scope.getData = function() {
        $scope.data = [];
        $scope.labels = [];
        $scope.year = []
        $scope.brand = null;
        $scope.showSmallLoader = true;
        $scope.no_data_msg = null;
        $scope.trendValues = true;
        return $http.get("/" + $scope.category).success(function (data, status, headers, config) {
            $scope.showSmallLoader = false;
            $scope.brandsList = JSON.parse(data.body);
        });
    };

     $scope.datasetOverride1 = [
                    {  yAxisID: 'y-axis-1', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(0,0, 255,1)"},
                    { yAxisID: 'y-axis-2', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(255,0, 0,1)"},
                    {  yAxisID: 'y-axis-3',backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(0,255, 255,1)"},
                    {  yAxisID: 'y-axis-4',backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(0,255, 0,1)"}
                ];


     $scope.datasetOverride2 = [
                    {  yAxisID: 'y-axis-1', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(0,0, 255,1)" },
                    {  yAxisID: 'y-axis-2', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(0,255, 0,1)" }
                ];
                $scope.options1 = {
                    legend: { display: true },
                    scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                         {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: false,
                            position: 'left'
                        }
                    ]
                    }
                };
                $scope.options2 = {
                    legend: { display: true },
                    scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-2',
                            type: 'linear',
                            display: false,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-3',
                            type: 'linear',
                            display: false,
                            position: 'left'
                        },
                        {
                            id: 'y-axis-4',
                            type: 'linear',
                            display: false,
                            position: 'left'
                        }
                    ]
                    }
                };

 $scope.colours = [{
      fillColor: "rgba(255,255,255,0)",
      pointColor : '#fff'
    }, {
      fillColor: "rgba(255,255,255,0)",
      pointColor : '#fff'
    }];
    $scope.colours1 = [{
      fillColor: "rgba(255,255,255,0)",
      pointColor : '#fff'
    }];

    $scope.colours2 = [{
      fillColor: "rgba(255,255,255,0)",
      pointColor : '#fff'
    },{
      fillColor: "rgba(255,255,255,0)",
      pointColor : '#fff'
    },
    {
      fillColor: "rgba(255,255,255,0)",
      pointColor : '#fff'
    },
    {
      fillColor: "rgba(255,255,255,0)",
      pointColor : '#fff'
    }];

    $scope.series = ['Original data', "Trend"];
    $scope.series1 = ['Seasonal data'];
    $scope.series2 = ["2014-15", "2015-16", "2016-17", "2017-18"];

    $scope.onBrandChange = function() {
        $scope.data = [];
        $scope.labels = [];
        $scope.year = []
        $scope.seasonalData = [];
        $scope.no_data_msg = null;
        $scope.showLoader = true;
        
        return $http.get("/" + $scope.category + "/" + $scope.brand).success(function (data, status, headers, config) {
            $scope.showLoader = false;
            if(data.body == "" || data.body == null || data.body == undefined){
                $scope.no_data_msg = "No data"
            } else {
                data = JSON.parse(data.body)
                var brandLabels = [];
                var brandValues = [];
                var year = [];
                var month = [];
                var trendValues = [];
                var seasonalValues = [];
                var monthlyData = [];
                var monthlyLabels = [];
                for(var i=0; i<data.length; i++) {
                    month.push(data[i].month);

                    if (i%4) {

                    } else {

                    }
                    if (i%52) {
                        month.push(data.month);
                    } else {

                    }
                    if (i%12 == 0) {
                        brandLabels.push(data[i].date.split("-")[0]);
                    } else {
                        brandLabels.push("");
                    }
                    
                    brandValues.push(data[i][$scope.brand]);
                    trendValues.push(data[i].trend);
                    seasonalValues.push(data[i].seasonal)
                    year.push(data[i].year);
                    month.push(data[i].month);
                }

                for (var j=0; j<(data.length/12 -1); j++) {
                    monthlyData[j] = [];
                    for (var i=0; i<12; i++) {
                        if (data[j*12 + i]) {
                            monthlyData[j].push(data[j*12 + i].seasonal);
                        }
                        
                    }
                }
                for (var i=0; i<12; i++) {
                    var month = parseInt(data[i].date.split("-")[1]); {
                        if (month == 1) {
                            monthlyLabels.push("Jan");
                        } 
                        if (month == 2) {
                            monthlyLabels.push("Feb");
                        } 
                        if (month == 3) {
                            monthlyLabels.push("Mar");
                        } 
                        if (month == 4) {
                            monthlyLabels.push("Apr");
                        } 
                        if (month == 5) {
                            monthlyLabels.push("May");
                        } 
                        if (month == 6) {
                            monthlyLabels.push("June");
                        } 
                        if (month == 7) {
                            monthlyLabels.push("Jul");
                        } 
                        if (month == 8) {
                            monthlyLabels.push("Aug");
                        } 
                        if (month == 9) {
                            monthlyLabels.push("Sep");
                        } 
                        if (month == 10) {
                            monthlyLabels.push("Oct");
                        } 
                        if (month == 11) {
                            monthlyLabels.push("Nov");
                        }
                        if (month == 12) {
                            monthlyLabels.push("Dec");
                        } 

                    }
                    
                }

                $scope.monthlyData = monthlyData;
                $scope.monthlyLabels = monthlyLabels;

                $scope.labels = brandLabels;
                $scope.seasonalData = [
                    seasonalValues
                ];
                $scope.data = [
                    brandValues,
                    trendValues
                ];
                $scope.onClick = function (points, evt) {
                    console.log(points, evt);
                };
                $scope.datasetOverride = [
                    { yAxisID: 'y-axis-1', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(0,0, 255,1)" }
                ];
                $scope.options = {
                    legend: { display: true },
                    scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }
                    ]
                    }
                };
               };
    })
    }

}]);

