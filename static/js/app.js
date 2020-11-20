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
  