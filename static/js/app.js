// Func to retreive top 10 OTU

function Top10OTU(sample, name) {
  var sampleValue = sample.filter(item => item.id === name)[0];

  var dataJSON = [];

  // loop through records to obtain specific id's
  for (var i = 0; i < sampleValue.otu_ids.length; i++) {

  }
}
  