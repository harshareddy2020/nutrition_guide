/**
 * Created by chsri on 4/15/2017.
 */
var stackArea = {};

stackArea.redraw = function (gMain, mainHeight, mainWidth){
    var event = new Event('harsha');
    var transitionTime = 2000;

    var group = labeller[xSelectedOption];
    var plotter = labeller[ySelectedOption];

    var xData = groupper[ySelectedOption];

    //var xData = ["A", "B", "C", "D", "E"];

    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = mainWidth - margin.left - margin.right,
        height = mainHeight - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .rangeRound([0, width]).paddingInner(0.1).paddingOuter(0.2);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var color = d3.scaleOrdinal();

    var xAxis = d3.axisBottom()
        .scale(x);

    var yAxis = d3.axisLeft()
        .scale(y);

    var svg;
    var dm;

    if(!$("#pad").is('*')){
        svg = gMain
            .append("g")
            .attr("id", "pad")
            .attr("transform", "translate(0,0 )");

    }
    else{
        svg = d3.select("#pad");
    }

    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };

    // Tracker
    // svg.select("#tracker").remove();
    // svg.append("line")
    //     .attr("id", "tracker")
    //     .attr("x1", 0)
    //     .attr("x2", 0)
    //     .attr("y1", 0)
    //     .attr("y2", height)
    //     .style("stroke", "#fff")
    //     .style("stroke-width", 1);


    function plotStuff(datamain, xData) {

        var stack = d3.stack().keys(xData)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);


        var dataStackLayout = stack(datamain);
        // console.log(datamain);
        // console.log(dataStackLayout);



        x.domain(datamain.map(function (d) {
            return d['group'];
        }));

        y.domain([0,
            d3.max(dataStackLayout[dataStackLayout.length - 1],
                function (d) {
                    return 1.25 * d[1];
                })
        ])
            .nice();

        var colorDomain = [];
        xData.forEach (function (val){
            colorDomain.push(colorsobj[val]);
        });
        color.range(colorDomain).domain(xData);

        var area = d3.area()
            .curve(d3.curveCardinal)
            .x(function (d, i) {
                return x(datamain[i]['group']) + x.bandwidth() / 2;
            })
            .y0(function (d) {
                return y(d[0]);
            })
            .y1(function (d) {
                return y(d[1]);
            });

        var selection = svg.selectAll(".layer")
            .data(dataStackLayout);

        var layer = selection.enter().append("g")
            .attr("class", "layer");

        selection.exit()
            .transition()
            .duration(transitionTime)
            .style("opacity", 0)
            .remove();

        var oldAreaSelection = selection.select(".area");

        var newAreaSelection = layer.append("path")
            .attr("class", "area");

        var allAreaSelection = newAreaSelection
            .merge(oldAreaSelection);

        // Change ID's or which need not interpolate.
        allAreaSelection.style("fill", function (d) {
            return color(d.key);
        }).attr("id", function (d) {
            return "area" + d.key;
        });
        newAreaSelection.attr("d", area);

        // Change elements which need transition.
        oldAreaSelection.transition()
            .duration(transitionTime)
            .attr("d", area);


        if (!$("#pad > .axis").is('*')){ // Draw axes for first time
            svg.append("g")
                .attr("class", "axis")
                .attr("id", "xAxis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "axis")
                .attr("id", "yAxis")
                .attr("transform", "translate(0,0)")
                .call(yAxis);
        }
        else{ // Redraw Axes
            svg.select("#xAxis")
                .transition()
                .duration(transitionTime)
                .call(xAxis);

            svg.select("#yAxis")
                .transition()
                .duration(transitionTime)
                .call(yAxis);
        }
        d3.select("#tracker").moveToFront();
    }

    // function plotLegend(xData){
    //
    //     svg.selectAll(".legend").remove();
    //
    //     var legend = svg.selectAll(".legend")
    //         .data(color.domain().slice().reverse())
    //         .enter().append("g")
    //         .attr("class", "legend")
    //         .attr("transform", function (d, i) {
    //             return "translate(0," + i * 30 + ")";
    //         });
    //
    //     legend.append("rect")
    //         .attr("class", "legendRect")
    //         .attr("x", width - 18)
    //         .attr("width", 18)
    //         .attr("height", 18)
    //         .style("fill", color)
    //         .attr("id", function (d, i) {
    //             return "id" + labeller[d];
    //         });
    //
    //     legend.append("line")
    //         .attr("class", "legendMarker")
    //         .attr("x1", width - 18)
    //         .attr("x2", width)
    //         .attr("y1", 0)
    //         .attr("y2", 18)
    //         .style("stroke", "#000")
    //         .style("display", "none")
    //         .style("stroke-width", 1)
    //         .attr("id", function (d) {
    //             return "marker" + labeller[d];
    //         });
    //
    //
    //     legend.append("text")
    //         .attr("x", width - 24)
    //         .attr("y", 14)
    //         .attr("xData", ".35em")
    //         .style("text-anchor", "end")
    //         .text(function (d) {
    //             return d;
    //         });
    // }

    d3.csv('../data/DR1_TOTupdate.csv', function(error, rawData) {
        if (error) throw error;

        var dataMain = d3.nest().key(function (d) {
            return d;
        }).rollup(function(k){return d3.nest()
            .key(function (d) {
                return binner(group, d[group]);
            }).rollup(function(d){
                return d3.mean(d.map(function(d){return d[labeller[k]];}));})
            .sortKeys(d3.ascending)
            .entries(rawData);})
            .entries(xData);

        console.log(xData);

        dm = dataMain[0].value.map(function (d, i) {
            var obj = {};
            obj['group'] = d.key;
            xData.forEach(function (element, index) {
                obj[element] = dataMain[index].value[i].value;
            });
            return obj;
        });

        console.log(dm);

        plotStuff(dm, xData);
        //plotLegend(xData);

        $(document).on("mouseenter", ".area", function () {
            $(this).css("stroke", "black");
        });

        $(document).on("mouseleave", ".area", function () {
            $(this).css("stroke", "");
        });


        $(document).on("mousemove", "#pad", function(event) {
            var mousePositionX = event.clientX - margin.left - 5;
            //var mousePositionY = event.clientY - margin.top - 5;
            $("#tracker").attr("x1", mousePositionX).attr("x2", mousePositionX);
        });

        // $(document).on("mouseenter", ".legendRect", function () {
        //     $(this).css("stroke", "black");
        // });

        // $(document).on("mouseleave", ".legendRect", function () {
        //     $(this).css("stroke", "");
        // });

        $(document).off("harsha");

        $(document).on("harsha", {"dataIs":dm, "xDataIs": xData}, function (event, arg1, arg2) {
            var flag = arg2;
            var dm = event.data.dataIs;
            var xData = event.data.xDataIs;
            var tempData = arg1;
            if (flag!=1){
                plotStuff(dm, tempData);
            }
            else{
                plotStuff(dm, xData);
            }
        });
    });
};