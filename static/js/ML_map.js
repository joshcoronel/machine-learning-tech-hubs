////////////////////////MAP CONTAINER///////////////////////////////////////////////
// ziptocoords = [53.1997242,-5.796644]

// function mapbox(coordinates) {       
// map = L.map("map", {
// center: coordinates,
// zoom: 11
// });

// // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 20,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA"
// }).addTo(map);
// return map
// }

// mapbox(ziptocoords)


////////////////////////USER INPUT HANDLER + MAP PANNING//////////////////////////////////////////////

function handleClick(){
    zipcode = (document.getElementById("USERINPUT").value) //THIS IS THE USER ZIPCODE ON CLICK OF THE SUBMIT BOX
    //console.log(zipcode)
        //zipurl = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:08820|country:US&key=AIzaSyCXHiDgN9t3DXorh6zgafpCdv-_Jop4HLs' //WORKING LINE
        zipurl = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+{zipcode}+"|country:US&key=AIzaSyCXHiDgN9t3DXorh6zgafpCdv-_Jop4HLs" //TO HIDE 
        d3.json(zipurl, function(data){
            console.log(data)
            // console.log(data.results[0].geometry.location.lat)
            // console.log(data.results[0].geometry.location.lng)
            LAT = (data.results[0].geometry.location.lat)
            LNG = (data.results[0].geometry.location.lng)

        ziptocoords = [LAT,LNG]

        function mapbox(coordinates) {       
        map = L.map("map", {
        center: coordinates,
        zoom: 11
        });

        // Adding tile layer
        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 20,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA"
        }).addTo(map);
        return map
        }

    mapbox(ziptocoords)
    })
        

        

        

    //JOSH THIS IS FOR YOU
    // url = "https://techhubml.s3.amazonaws.com/Master.csv"
    // d3.csv(url, function (data){
    //     console.log(data)
        
    //});



    return false;
}











//CONVERT TO JS
// zipcode = [str(x) for x in request.form.values()]


// ## Code to call all the feature values for the requested zip code
// df = pd.read_csv("https://techhubml.s3.amazonaws.com/Master.csv", encoding="ISO-8859-1", converters={'zipcode': lambda x: str(x)})

// if zipcode[0] in list(df["zipcode"]):
//     features = df.loc[df['zipcode'] == zipcode[0]].values[0]
//     city = features[2]
//     state = features[1]
//     final_features = np.delete(features,[0,1,2,3])

//     prediction = model.predict([final_features])

//     if prediction == '1':
//         output = "Yes"
//     else:
//         output = "No"

//     results = [f"Move your next start up here? {output}!", f"{city}, {state} {zipcode[0]}", f"Average Real Estate: ${final_features[0]}",f"Income per capita: ${final_features[1]}",f"Percentage of Population with Bachelors: {round(100*final_features[4],2)}%", f"Percentage of population that use public transportation: {round(100*final_features[5],2)}%", f"Median Age Female: {final_features[2]}", f"Median Age Male: {final_features[3]}"] 
// else:
//     results = ["Invalid zip code. Try again."]

// //TABLE MAKER
// var austinWeather = [{
//     date: "2018-02-01",
//     low: 51,
//     high: 76
//   },
//   {
//     date: "2018-02-02",
//     low: 47,
//     high: 59
//   },
//   {
//     date: "2018-02-03",
//     low: 44,
//     high: 59
//   },
//   {
//     date: "2018-02-04",
//     low: 52,
//     high: 73
//   },
//   {
//     date: "2018-02-05",
//     low: 47,
//     high: 71
//   }
//   ];
  
//   d3.select("tbody")
//     .selectAll("tr")
//     .data(austinWeather)
//     .enter()
//     .append("tr")
//     .html(function(d) {
//       return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
//     });
  