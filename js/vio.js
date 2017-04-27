/**
 * Created by chsri on 4/7/2017.
 */

var vioPlot = {};

vioPlot.redraw = function (gMain, mainHeight, mainWidth, option){
    var ySelectedOption = option;
    var group = labeller[xSelectedOption];
    var plotter = labeller[ySelectedOption];
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = mainWidth - margin.left - margin.right,
        height = mainHeight - margin.top - margin.bottom;

    var g = gMain;
    var x = d3.scaleBand()
        .range([0, width]).paddingInner(0.1).paddingOuter(0.2);

    var vioScale = d3.scaleLinear();

    var y = d3.scaleLinear()
        .range([height, 0]);

    var area = d3.area()
        .x(function(d) { return y(d[0]); })
        .y0(function(d) { return -vioScale(d[1]); })
        .y1(function(d) { return vioScale(d[1]); });

    d3.csv('../data/DR1_TOTupdate.csv', function(error, rawData){
        if (error) throw error;

        var data = d3.nest()
            .key(function (d) {
                return binner(group, d[group]);
            }).sortKeys(d3.ascending)
            .entries(rawData);

        console.log(data);

        x.domain(data.map(function (d){return d.key;}));

        y.domain([0, d3.max(data, function (dat){
            return d3.max(dat.values, function(d) {
                return +d[plotter];});
        })]);

        vioScale.range([0, x.bandwidth()/2]);

        var xAxis = d3.axisBottom(x);
        var yAxis = d3.axisLeft(y);

        if (!$(".vioPad > .axis").is('*')){ // Draw axes for first time
            g.append("g")
                .attr("class", "x axis")
                .attr("id", "xAxis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("class", "label")
                .attr("x", width)
                .attr("y", -6)
                .style("text-anchor", "end");

            g.append("g")
                .attr("class", "y axis")
                .attr("id", "yAxis")
                .attr("transform", "translate(0,0)")
                .call(yAxis);
        }
        else{ // Redraw Axes
            g.select("#xAxis")
                .transition()
                .duration(transitionTime)
                .call(xAxis);

            g.select("#yAxis")
                .transition()
                .duration(transitionTime)
                .call(yAxis);
        }

        var kde = kernelDensityEstimator(epanechnikovKernel(7), y.ticks(100));

        var vioData = data.map(function (d){
            return kde(d.values.map(function (d) {return +d[plotter];}));
        });

        var vioKeys = data.map(function (d) {return d.key;});

        vioScale.domain([0, d3.max(vioData, function (dat){
            return d3.max(dat, function(d) {
                //console.log(d[1]);
                return d[1];});
        })]);

        var selection = g.selectAll(".vio").data(vioData);

        // Remove extras
        selection.exit()
            .transition()
            .duration(transitionTime)
            .style("opacity", 0)
            .remove();

        var tomerge = selection.select(".violin");


        // Add New Stuff
        selection
            .enter().append("g")
            .attr("class", "vio")
            .append("path").attr("class", "violin").merge(tomerge)
            .style("opacity", 0)
            .style("fill", colorsobj[ySelectedOption])
            .transition()
            .duration(0)
            .attr("d", area)
            .attr("transform", function (d, i){
                return "translate (" + (x(vioKeys[i]) + x.bandwidth()/2) + " 0 ) rotate(90 0 0)"; })
            .transition()
            .duration(transitionTime)
            .style("opacity", 100);

    });
    $(document).off("drawVio");

    $(document).on("drawVio", {"gMain": gMain, "mainHeight": mainHeight, "mainWidth": mainWidth}, function (event, arg1) {
        vioPlot.redraw(event.data.gMain, event.data.mainHeight, event.data.mainWidth, arg1);
    })
};

function kernelDensityEstimator(kernel, x) {
    return function(sample) {
        return x.map(function(x) {
            return [x, d3.mean(sample, function(v) { return kernel(x - v); })];
        });
    };
}

function epanechnikovKernel(scale) {
    return function(u) {
        return Math.abs(u /= scale) <= 1 ? .75 * (1 - u * u) / scale : 0;
    };
}