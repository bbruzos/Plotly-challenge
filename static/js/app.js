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


  