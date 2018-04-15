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
        $("#container").html("");
        return $http.get("/" + $scope.category).success(function (data, status, headers, config) {
            $scope.showSmallLoader = false;
            $scope.brandsList = JSON.parse(data.body);
        });
    };



    $scope.initiateMap = function(mapData) {
/**
 * This is a complicated demo of Highmaps, not intended to get you up to speed
 * quickly, but to show off some basic maps and features in one single place.
 * For the basic demo, check out https://www.highcharts.com/maps/demo/geojson
 * instead.
 */

// Base path to maps
var baseMapPath = "https://code.highcharts.com/mapdata/",
    showDataLabels = false, // Switch for data labels enabled/disabled
    mapCount = 0,
    searchText,
    mapOptions = '';

// Populate dropdown menus and turn into jQuery UI widgets
$.each(Highcharts.mapDataIndex, function (mapGroup, maps) {
    if (mapGroup !== "version") {
        mapOptions += '<option class="option-header">' + mapGroup + '</option>';
        $.each(maps, function (desc, path) {
            mapOptions += '<option value="' + path + '">' + desc + '</option>';
            mapCount += 1;
        });
    }
});
searchText = 'Search ' + mapCount + ' maps';
mapOptions = '<option value="custom/world.js">' + searchText + '</option>' + mapOptions;
$("#mapDropdown").append(mapOptions).combobox();

// Change map when item selected in dropdown
$("#mapDropdown").change(function () {
    var $selectedItem = $("option:selected", this),
        mapDesc = $selectedItem.text(),
        mapKey = this.value.slice(0, -3),
        svgPath = baseMapPath + mapKey + '.svg',
        geojsonPath = baseMapPath + mapKey + '.geo.json',
        javascriptPath = baseMapPath + this.value,
        isHeader = $selectedItem.hasClass('option-header');

    // Dim or highlight search box
    if (mapDesc === searchText || isHeader) {
        $('.custom-combobox-input').removeClass('valid');
        location.hash = '';
    } else {
        $('.custom-combobox-input').addClass('valid');
        location.hash = mapKey;
    }

    if (isHeader) {
        return false;
    }

    // Show loading
    if (Highcharts.charts[0]) {
        Highcharts.charts[0].showLoading('<i class="fa fa-spinner fa-spin fa-2x"></i>');
    }


    // When the map is loaded or ready from cache...
    function mapReady() {

        var mapGeoJSON = Highcharts.maps[mapKey],
            data = [],
            parent,
            match;
            var mapReqData = [];
            for( var i=0; i<mapData.length; i++) {
                mapReqData.push({
                    key: mapGeoJSON.features[i]["properties"]["hc-key"],
                    value: mapData[i][$scope.brand]
                });
            }

        // Update info box download links
        $("#download").html(
            '<a class="button" target="_blank" href="https://jsfiddle.net/gh/get/jquery/1.11.0/' +
                'highcharts/highcharts/tree/master/samples/mapdata/' + mapKey + '">' +
                'View clean demo</a>' +
                '<div class="or-view-as">... or view as ' +
                '<a target="_blank" href="' + svgPath + '">SVG</a>, ' +
                '<a target="_blank" href="' + geojsonPath + '">GeoJSON</a>, ' +
                '<a target="_blank" href="' + javascriptPath + '">JavaScript</a>.</div>'
        );

        // Generate non-random data for the map
        $.each(mapGeoJSON.features, function (index, feature) {
            data.push({
                key: feature.properties['hc-key'],
                value: index
            });
        });

        // Show arrows the first time a real map is shown
        if (mapDesc !== searchText) {
            $('.selector .prev-next').show();
            $('#sideBox').show();
        }

        // Is there a layer above this?
        match = mapKey.match(/^(countries\/[a-z]{2}\/[a-z]{2})-[a-z0-9]+-all$/);
        if (/^countries\/[a-z]{2}\/[a-z]{2}-all$/.test(mapKey)) { // country
            parent = {
                desc: 'World',
                key: 'custom/world'
            };
        } else if (match) { // admin1
            parent = {
                desc: $('option[value="' + match[1] + '-all.js"]').text(),
                key: match[1] + '-all'
            };
        }
        $('#up').html('');
        if (parent) {
            $('#up').append(
                $('<a><i class="fa fa-angle-up"></i> ' + parent.desc + '</a>')
                    .attr({
                        title: parent.key
                    })
                    .click(function () {
                        $('#mapDropdown').val(parent.key + '.js').change();
                    })
            );
        }


        // Instantiate chart
        $("#container").highcharts('Map', {

            title: {
                text: null
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 0,
                stops: [
                    [0, '#EFEFFF'],
                    [0.5, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
                ]
            },

            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'bottom'
            },

            series: [{
                data: mapReqData,
                mapData: mapGeoJSON,
                joinBy: ['hc-key', 'key'],
                name: 'Random data',
                states: {
                    hover: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                dataLabels: {
                    enabled: showDataLabels,
                    formatter: function () {
                        return mapKey === 'custom/world' || mapKey === 'countries/us/us-all' ?
                                (this.point.properties && this.point.properties['hc-a2']) :
                                this.point.name;
                    }
                },
                point: {
                    events: {
                        // On click, look for a detailed map
                        click: function () {
                            var key = this.key;
                            $('#mapDropdown option').each(function () {
                                if (this.value === 'countries/' + key.substr(0, 2) + '/' + key + '-all.js') {
                                    $('#mapDropdown').val(this.value).change();
                                }
                            });
                        }
                    }
                }
            }, {
                type: 'mapline',
                name: "Separators",
                data: Highcharts.geojson(mapGeoJSON, 'mapline'),
                nullColor: 'gray',
                showInLegend: false,
                enableMouseTracking: false
            }]
        });

        showDataLabels = $("#chkDataLabels").prop('checked');

    }

    // Check whether the map is already loaded, else load it and
    // then show it async
    if (Highcharts.maps[mapKey]) {
        mapReady();
    } else {
        $.getScript(javascriptPath, mapReady);
    }
});

// Toggle data labels - Note: Reloads map with new random data
$("#chkDataLabels").change(function () {
    showDataLabels = $("#chkDataLabels").prop('checked');
    $("#mapDropdown").change();
});

// Switch to previous map on button click
$("#btn-prev-map").click(function () {
    $("#mapDropdown option:selected").prev("option").prop("selected", true).change();
});

// Switch to next map on button click
$("#btn-next-map").click(function () {
    $("#mapDropdown option:selected").next("option").prop("selected", true).change();
});

// Trigger change event to load map on startup
if (location.hash) {
    $('#mapDropdown').val(location.hash.substr(1) + '.js');
} else { // for IE9
    $($('#mapDropdown option')[0]).attr('selected', 'selected');
}
   $('#mapDropdown').change();


    }
     $scope.datasetOverride1 = [
                    {  yAxisID: 'y-axis-1', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(163,163,255,0.24)"},
                    { yAxisID: 'y-axis-2', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(163,163,255,0.24)"},
                    {  yAxisID: 'y-axis-3',backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(163,163,255,0.48)"},
                    {  yAxisID: 'y-axis-4',backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(163,163,255,1)"}
                ];


     $scope.datasetOverride2 = [
                    {  yAxisID: 'y-axis-1', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(163, 163, 255,0.48)" },
                    {  yAxisID: 'y-axis-2', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(163, 163, 255,1)" }
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
        $scope.mapData = [];
        $("#container").html("")
        
        return $http.get("/" + $scope.category + "/" + $scope.brand).success(function (data, status, headers, config) {
            $scope.showLoader = false;
            if(data.body == "" || data.body == null || data.body == undefined){
                $scope.no_data_msg = "No data"
            } else {
                data = JSON.parse(data.body)
                var mapData = JSON.parse(data.df_country);
                var mapReqData = [];
                data = JSON.parse(data.df_result);
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
                        brandLabels.push(String(data[i].date.split("-")[0]));
                    } else {
                        brandLabels.push("");
                    }
                    
                    brandValues.push(data[i][$scope.brand]);
                    trendValues.push(data[i].trend);
                    seasonalValues.push(data[i].seasonal)
                    year.push(data[i].year);
                    month.push(data[i].month);
                }
            
                $scope.mapData = mapReqData;
                $scope.initiateMap(mapData);

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
                    { yAxisID: 'y-axis-1', backgroundColor: "rgba(255,255, 255,0)", borderColor: "rgba(163, 163, 255,1)" }
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

