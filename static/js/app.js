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

  Plotly.newPlot("bar", trace1, {displayModeBar: false});
}

// Func to display bubble chart

function displaybubbleChart (sample,name){
  
  var trace2 = [{
    x: sampleValue.otu_ids,
    y: sampleValues.sample_values,
    text: sampleValues.otu_labels,

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
function showGauge(metadata, name) {

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
        text: "Belly Button Wash Frequency (Scrub",
        font: { size: 18, color: 'black',  }
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