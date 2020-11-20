// Func to retreive top 10 OTU

function Top10OTU(sample, name) {
  var sampleValue = sample.filter(item => item.id === name)[0];

  var dataJSON = [];

  // loop through records to obtain specific id's
  for (var i = 0; i < sampleValue.otu_ids.length; i++) {

    // Json dict to append to dataJSON list
    dictJSON = {
      sampleValues: sampleValue.sample_values[i],
      otuID: sampleValue.otu_ids[i],
      otuLabel: sampleValue.otu_labels[i]
    }
    dataJSON.push(dictJSON)
  }
  var sortedValues = dataJSON.sort((a,b) => b.sampleValues - a.sampleValues);

  // top ten of the sample values
  var topTenData = sortedValues.slice(0,10);

  return topTenData;
}

// Func to display bar chart

function displaybarChart (sample, name) {
  var dataDisplay = Top10OTU(sample,name);

  var trace1 = [{
    // X-value, Y-value, labels and text
    type: "bar",
    x: dataDisplay.map(item => item.sampleValues).reverse(),
    y: dataDisplay.map(item => 'OTU' + item.outID).reverse(),
    labels: dataDisplay.map(item => 'OTU' + item.outID).reverse(),
    text: dataDisplay.map( item => item.otuLabel).reverse(),
    orientation: "h"

  }];

  // Layout of bar
  var barLayout = {
    autosize: true,
    margin: {
      l: 100,
      r: 10,
      b: 20,
      t:30,
      pad:0
    },
    showlegend: false
  };
  Plotly.newPlot("bar", trace1, {displayModeBar: false});
}

// Func to display bubble chart

function displaybubbleChart (sample,name){
  
  var sampleValue = sample.filter(item => item.id === name)[0];

  var trace2 = [{
    x: sampleValue.otu_ids,
    y: sampleValue.sample_values,
    text: sampleValue.otu_labels,

    mode: 'markers',
    marker: {
      // Size of marker based on value of experiment
      size: sampleValue.sample_values,
      color: sampleValue.otu_ids,
      colorscale: 'Earth'

    }
  }];

  // Layout of bubble chart
  var bubbleLayout = {
    autosize: true,
    xaxis: { title: "OTU ID"},
    title: "Bubble Chart",
    config: {
      'displayModeBar': true
    }
  };
  Plotly.newPlot('bubble', displaybubbleChart, bubbleLayout);
}

// func for Guage display
function gaugeDisplay(metadata, name) {

  //lookup the data by experiment name 
  var sampleMeta = metadata.filter(m => m.id === parseInt(name));

  var trace3 = [
    {
      // Type of gauge
      type: "indicator",
      mode: "gauge+number+delta",
      // Indicator value
      value: sampleMeta[0].wfreq,
      // Display title for gauge
      title: {
        text: "Belly Button Wash Frequency (Scrub Per Week)",
        font: { size: 14, color: 'black',  }
      },
      delta: { reference: 0, increasing: { color: "RebeccaPurple" } },
      gauge: {
        axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkred" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        // Gauge color
        steps: [
          { range: [0, 1], color: "#ffffcc" },
          { range: [1, 2], color: '#ffff99' },
          { range: [2, 3], color: '#ffff66' },
          { range: [3, 4], color: '#ccff66' },
          { range: [4, 5], color: '#ccff33' },
          { range: [5, 6], color: '#99ff33' },
          { range: [6, 7], color: '#99cc00' },
          { range: [7, 8], color: '#669900' },
          { range: [8, 9], color: '#009900' }

        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 490
        }
      }
    }
  ];
  // Gauge chart layout 
  var gaugeLayout = {

    autosize: true,
    margin: { t: 0, r: 25, l: 25, b: 25, pad: 0 },
    paper_bgcolor: "white",
    font: { color: "darkblue", family: "Arial" }
  };
  // gauge chart layout
  Plotly.newPlot('gauge', trace3, gaugeLayout);
}

// Func for displaying OTU info

function infoOTU(metadata, name) {

  var sampleMeta = metadata.filter(item => item.id === parseInt(name));
  var metadataSpace = d3.select("#sample-metadata")

  // Empty html value
  metadataSpace.html("");

  // Add each key:value pair to info box
  Object.entries(sampleMeta[0]).forEach(([key, value]) => {
    var row = metadataSpace.append("p");
    row.text(`${key}:${value}`);
  })
}

// Run all functions and retrieve data upon opening app
d3.json("data/samples.json").then((jsondata) => {
  var selectDrop = d3.select("#selDataset");
  selectDrop.selectAll('option')
    .data(jsondata.names.map(item => item))
    .enter().append('option')
    .text(text => text)

    // Retrieve labels, samples, and metadata from json file
    var names = jsondata.names;
    var sample = jsondata.samples;
    var metadata = jsondata.metadata;

    // Display bar chart, data info, gauge chart, and bubble for first value
    displaybarChart(sample, names[0])
    infoOTU(metadata, names[0])
    gaugeDisplay(metadata, names[0])
    displaybubbleChart(sample, names[0])

    selectDrop.on("change", dropdownList);
    // Event handlet for dropdown list function
    function dropdownList (){
      d3.event.preventDefault();
      var userInput = d3.select("select");
      var userSample = userInput.property("value").replace();

      displaybarChart(sample, userSample)
      infoOTU(metadata, userSample)
      gaugeDisplay(metadata, userSample)
      displaybubbleChart(sample,userSample)

    }


});