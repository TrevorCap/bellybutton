function buildMetadata(sample) {

    d3.json(`/metadata/${sample}`).then((data) => {
      console.log(data)
      var metadata = d3.select("#sample-metadata");
      metadata.html("");
      Object.entries(data).forEach(([key, value]) => {
        console.log(key, value);
        metadata.append("h6").text(`${key}: ${value}`);
      });
    });
};

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {
    console.log(data);
    var otu_ids = data.otu_ids;
    var otu_labels = data.otu_labels;
    var sample_values = data.sample_values;
    // console.log(otu_ids,otu_labels,sample_values);



    // @TODO: Build a Bubble Chart using the sample data
    var bubbleLayout_1 = {
      margin:{t:0},
      hovermode: "closest",
      xaxis: {title:"OTU ID"}
    };
    let bubbleData_1 = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ]
    Plotly.newPlot("bubble", bubbleData_1, bubbleLayout_1);

    var pieData_1 = [
      {
        values: sample_values.slice(0,10),
        labels: otu_ids.slice(0, 10),
        hovertext: otu_labels.slice(0,10),
        hoverinfo: "hovertext",
        type: "pie"
      }
    ];

    var pieLayout_1 = {
      margin: {t: 0, l: 0}
    };

    Plotly.newPlot("pie", pieData_1, pieLayout_1);
  });
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
