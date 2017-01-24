var map = L.map('mapid').setView([5.0091806, 108.5215526], 7);
L.gridLayer.googleMutant({
    type: 'terrain'
}).addTo(map);
var redIcon = L.icon({
    iconUrl: 'images/markers/red-marker.png',
    iconSize: [25, 37],
    iconAnchor: [9, 37],
    popupAnchor: [4, -21]
});

/** Marker with Popup charts from Amchart **/
var m1 = L.marker([1.5199, 103.7267], {
    draggable: false,
    icon: redIcon
});
m1.bindPopup('<div class="row"><div class="col-md-6"><div id="pie-chart"></div></div><div class="col-md-6"><div id="bar-chart"></div></div></div>',
    {
        'minWidth': '1600'
    });
m1.openPopup();
m1.on('click', function () {
    piechart();
    barchart();
});
m1.addTo(map);
/** END **/

/** Marker with Popup OpenWeather API **/
/** For more info for OpenWeather API https://openweathermap.org/ **/
var m2 = L.marker([1.5587, 110.3108], {
    draggable: false,
    icon: redIcon
});
m2.bindPopup('<div class="row"><div class="col-md-12" id="weather"></div></div>',
    {
        'minWidth': '300'
    });
m2.openPopup();
m2.on('click', function () {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {
            "lat": 1.5587,
            "lon": 110.3108,
            "APPID": "f6d3328994cbb04df5ca519c8f5e7dc2", // Add Your Own API
        },
        error: function () {
            document.getElementById('weather').innerHTML = 'An error occurred';
        },
        dataType: 'json',
        success: function (data) {

            document.getElementById('weather').innerHTML = '<i class="owf owf-' + data.weather[0].id + '" style="font-size: 60px;line-height: 60px;"></i>';
            document.getElementById('weather').innerHTML += '<div class="weather-desc">' + data.weather[0].description + '</div>';
            document.getElementById('weather').innerHTML += '<li>Country: ' + data.sys.country + '</li>';
            document.getElementById('weather').innerHTML += '<li>Wind Speed: ' + data.wind.speed + '</li>';
            document.getElementById('weather').innerHTML += '<li>Temp. : ' + fToC(data.main.temp) + '</li>';
            document.getElementById('weather').innerHTML += '<li>Min Temp. : ' + fToC(data.main.temp_min) + '</li>';
            document.getElementById('weather').innerHTML += '<li>Max Temp. : ' + fToC(data.main.temp_max) + '</li>';
            document.getElementById('weather').innerHTML += '<li>Humidity : ' + data.main.humidity + '</li>';
        },
        type: 'GET'
    });
});
m2.addTo(map);
/** END **/

function fToC(fahrenheit) {
    var fTemp = fahrenheit;
    var fToCel = (fTemp - 32) * 5 / 9;
    var message = fTemp + '\xB0F / ' + fToCel + '\xB0C.';
    return message;
}

function piechart() {
    AmCharts.makeChart("pie-chart", {
        "type": "pie",
        "theme": "light",
        "dataProvider": [{
            "country": "Lithuania",
            "litres": 501.9
        }, {
            "country": "Czech Republic",
            "litres": 301.9
        }, {
            "country": "Ireland",
            "litres": 201.1
        }, {
            "country": "Germany",
            "litres": 165.8
        }, {
            "country": "Australia",
            "litres": 139.9
        }, {
            "country": "Austria",
            "litres": 128.3
        }, {
            "country": "UK",
            "litres": 99
        }, {
            "country": "Belgium",
            "litres": 60
        }, {
            "country": "The Netherlands",
            "litres": 50
        }],
        "valueField": "litres",
        "titleField": "country",
        "balloon": {
            "fixedPosition": true
        },
        "export": {
            "enabled": false
        }
    });
}

function barchart() {
    AmCharts.makeChart("bar-chart", {
        "type": "serial",
        "theme": "light",
        "categoryField": "year",
        "rotate": true,
        "startDuration": 1,
        "categoryAxis": {
            "gridPosition": "start",
            "position": "left"
        },
        "trendLines": [],
        "graphs": [
            {
                "balloonText": "Income:[[value]]",
                "fillAlphas": 0.8,
                "id": "AmGraph-1",
                "lineAlpha": 0.2,
                "title": "Income",
                "type": "column",
                "valueField": "income"
            },
            {
                "balloonText": "Expenses:[[value]]",
                "fillAlphas": 0.8,
                "id": "AmGraph-2",
                "lineAlpha": 0.2,
                "title": "Expenses",
                "type": "column",
                "valueField": "expenses"
            }
        ],
        "guides": [],
        "valueAxes": [
            {
                "id": "ValueAxis-1",
                "position": "top",
                "axisAlpha": 0
            }
        ],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": [
            {
                "year": 2005,
                "income": 23.5,
                "expenses": 18.1
            },
            {
                "year": 2006,
                "income": 26.2,
                "expenses": 22.8
            },
            {
                "year": 2007,
                "income": 30.1,
                "expenses": 23.9
            },
            {
                "year": 2008,
                "income": 29.5,
                "expenses": 25.1
            },
            {
                "year": 2009,
                "income": 24.6,
                "expenses": 25
            }
        ],
        "export": {
            "enabled": true
        }

    });
}