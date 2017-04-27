/**
 * Created by chsri on 4/19/2017.
 */
/**
 * Created by chsri on 4/15/2017.
 */
var pairedHist = {};

pairedHist.redraw = function (gMain, mainHeight, mainWidth, pairedDiv){

    var transitionTime = 2000;

    var group = labeller[xSelectedOption];
    var plotter = labeller[ySelectedOption];

    var xData = groupper[ySelectedOption];

    //var xData = ["A", "B", "C", "D", "E"];

    var margin = {top: 20, right: 50, bottom: 30, left: 50},
        width = mainWidth - margin.left - margin.right,
        height = mainHeight - margin.top - margin.bottom;

    var y = d3.scaleBand()
        .rangeRound([height, 0]).paddingInner(0.1);

    var xLeft = d3.scaleLinear()
        .rangeRound([width/2, 0]);
    var xRight = d3.scaleLinear()
        .rangeRound([0, width/2]);

    var xAxis = d3.axisBottom()
        .scale(xLeft);

    var yAxis = d3.axisLeft()
        .scale(y);

    var color = d3.scaleOrdinal();

    var svg, leftg, rightg;
    var ldm, rdm;

    if(!$("#pairpad").is('*')){
        svg = gMain
            .append("g")
            .attr("id", "pairpad")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        leftg = svg.append("g")
            .attr("id", "lefty");

        rightg = svg.append("g")
            .attr("id", "righty")
            .attr("transform", "translate(" + (width/2 + 10) + ", 0)");

    }
    else{
        svg = d3.select("#pairpad");
        leftg = d3.select("#lefty");
        rightg = d3.select("#righty");
    }

    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };


    function plotPairedHist(leftdatamain, rightdatamain, xData) {

        var stack = d3.stack().keys(xData)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone);


        var LdataStackLayout = stack(leftdatamain);
        var RdataStackLayout = stack(rightdatamain);
        // console.log(datamain);
        console.log(RdataStackLayout);



        y.domain(leftdatamain.map(function (d) {
            return d['group'];
        }));

        var maxVal = d3.max([d3.max(LdataStackLayout[LdataStackLayout.length - 1],
            function (d) {
                return 1.25 * d[1];
            }), d3.max(RdataStackLayout[RdataStackLayout.length - 1],
            function (d) {
                return 1.25 * d[1];
            })]);

        xLeft.domain([0, maxVal])
            .nice();

        xRight.domain([0, maxVal])
            .nice();

        var colorDomain = [];
        xData.forEach (function (val){
            colorDomain.push(colorsobj[val]);
        });
        color.range(colorDomain).domain(xData);

        var selection = leftg.selectAll(".leftlayer")
            .data(LdataStackLayout);

        var layer = selection.enter().append("g")
            .attr("class", "leftlayer")
            .attr("fill", function (d) {
                return color(d.key);
            });

        selection.transition()
            .duration(transitionTime).attr("fill", function (d) {
            return color(d.key);
        });

        selection.exit()
            .transition()
            .duration(transitionTime)
            .style("opacity", 0)
            .remove();

        var mergedLayers = selection.merge(layer);

        //var oldAreaSelection = selection.select(".rects");
        var oldRectsSelection = mergedLayers.selectAll(".leftrects")
            .data(function (d){
                return d;
            });

        oldRectsSelection.exit()
            .transition()
            .duration(transitionTime)
            .style("opacity", 0)
            .remove();

        oldRectsSelection.transition()
            .duration(transitionTime)
            .attr("y", function (d, i) {
                return y(leftdatamain[i]['group']);
            })
            .attr("x", function (d) {
                return xLeft(d[1]);
            })
            .attr("width", function (d) {
                return xLeft(d[0]) - xLeft(d[1]);
            })
            .attr("height", y.bandwidth());

        var newRectsSelection = oldRectsSelection.enter().append("rect")
            .attr("class", "leftrects");

        var allRectsSelection = newRectsSelection
            .merge(oldRectsSelection);

        allRectsSelection.on("mousemove", function(d){
            pairedDiv.style("left", d3.event.pageX+10+"px");
            pairedDiv.style("top", d3.event.pageY-25+"px");
            pairedDiv.style("display", "inline-block");
            var value = Number(Math.round((d[1] - d[0])+'e2')+'e-2');
            pairedDiv.html((value));
        });
        allRectsSelection.on("mouseout", function(d){
            pairedDiv.style("display", "none");
        });

        // Change ID's or which need not interpolate.
        allRectsSelection.attr("id", function (d, i) {
            return "leftrects" + leftdatamain[i]['group'];
        }).attr("y", function (d, i) {
            return y(leftdatamain[i]['group']);
        }).attr("height", y.bandwidth());

        // Change elements which need transition.
        newRectsSelection.attr("x", width/2).transition()
            .duration(transitionTime)
            .attr("x", function (d) {
                return xLeft(d[1]);
            })
            .attr("width", function (d) {
                return xLeft(d[0]) - xLeft(d[1]);
            });

        if (!$("#pairpad > .axis").is('*')){
            leftg.append("text").attr("class", "prettyLabel")
                .text("Male").attr("transform", "translate ("+ width/4+", "+ (height+margin.bottom) +")");
        }

        ///////////////////////////////// Right plot ///////////////////////////////

        selection = rightg.selectAll(".rightlayer")
            .data(RdataStackLayout);

        layer = selection.enter().append("g")
            .attr("class", "rightlayer")
            .attr("fill", function (d) {
                return color(d.key);
            });

        selection.transition()
            .duration(transitionTime).attr("fill", function (d) {
            return color(d.key);
        });

        selection.exit()
            .transition()
            .duration(transitionTime)
            .style("opacity", 0)
            .remove();

        mergedLayers = selection.merge(layer);

        //var oldAreaSelection = selection.select(".rects");
        oldRectsSelection = mergedLayers.selectAll(".rightrects")
            .data(function (d){
                return d;
            });

        oldRectsSelection.exit()
            .transition()
            .duration(transitionTime)
            .style("opacity", 0)
            .remove();

        oldRectsSelection.transition()
            .duration(transitionTime)
            .attr("y", function (d, i) {
                return y(rightdatamain[i]['group']);
            })
            .attr("x", function (d) {
                return xRight(d[0]);
            })
            .attr("width", function (d) {
                return xRight(d[1]) - xRight(d[0]);
            })
            .attr("height", y.bandwidth());

        newRectsSelection = oldRectsSelection.enter().append("rect")
            .attr("class", "rightrects");

        allRectsSelection = newRectsSelection
            .merge(oldRectsSelection);

        allRectsSelection.on("mousemove", function(d){
            pairedDiv.style("left", d3.event.pageX+10+"px");
            pairedDiv.style("top", d3.event.pageY-25+"px");
            pairedDiv.style("display", "inline-block");
            var value = Number(Math.round((d[1] - d[0])+'e2')+'e-2');
            pairedDiv.html((value));
        });
        allRectsSelection.on("mouseout", function(d){
            pairedDiv.style("display", "none");
        });

        // Change ID's or which need not interpolate.
        allRectsSelection.attr("id", function (d, i) {
            return "rightrects" + rightdatamain[i]['group'];
        }).attr("y", function (d, i) {
            return y(rightdatamain[i]['group']);
        }).attr("height", y.bandwidth());

        // Change elements which need transition.
        newRectsSelection.transition()
            .duration(transitionTime)
            .attr("x", function (d) {
                return xRight(d[0]);
            })
            .attr("width", function (d) {
                return xRight(d[1]) - xRight(d[0]);
            });

        if (!$("#pairpad > .axis").is('*')){
            rightg.append("text").attr("class", "prettyLabel")
                .text("Female").attr("transform", "translate ("+ width/4+", "+ (height+margin.bottom) +")");
        }

        if (!$("#pairpad > .axis").is('*')){ // Draw axes for first time
            // svg.append("g")
            //     .attr("class", "axis")
            //     .attr("id", "xAxis")
            //     .attr("transform", "translate(0," + height + ")")
            //     .call(xAxis);

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

    }

    function plotLegend(xData){

        svg.selectAll(".legend").remove();

        var legend = svg.selectAll(".legend")
            .data(color.domain().slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 30 + ")";
            });

        legend.append("rect")
            .attr("class", "legendRect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color)
            .attr("id", function (d, i) {
                return "id" + labeller[d];
            });

        legend.append("line")
            .attr("class", "legendMarker")
            .attr("x1", width - 18)
            .attr("x2", width)
            .attr("y1", 0)
            .attr("y2", 18)
            .style("stroke", "#000")
            .style("display", "none")
            .style("stroke-width", 1)
            .attr("id", function (d) {
                return "marker" + labeller[d];
            });


        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 14)
            .attr("xData", ".35em")
            .style("text-anchor", "end")
            .text(function (d) {
                return d;
            });
    }

    d3.csv('../data/DR1_TOTupdate.csv', function(error, rawData) {
        if (error) throw error;

        var leftData = rawData.filter(function (d) {
            return d[labeller['Gender']] == 1;
        });
        var rightData = rawData.filter(function (d) {
            return d[labeller['Gender']] == 2;
        });

        var leftdataMain = d3.nest().key(function (d) {
            return d;
        }).rollup(function(k){return d3.nest()
            .key(function (d) {
                return binner(group, d[group]);
            }).rollup(function(d){
                return d3.mean(d.map(function(d){return d[labeller[k]];}));})
            .sortKeys(d3.ascending)
            .entries(leftData);})
            .entries(xData);

        var rightdataMain = d3.nest().key(function (d) {
            return d;
        }).rollup(function(k){return d3.nest()
            .key(function (d) {
                return binner(group, d[group]);
            }).rollup(function(d){
                return d3.mean(d.map(function(d){return d[labeller[k]];}));})
            .sortKeys(d3.ascending)
            .entries(rightData);})
            .entries(xData);


        ldm = leftdataMain[0].value.map(function (d, i) {
            var obj = {};
            obj['group'] = d.key;
            xData.forEach(function (element, index) {
                obj[element] = leftdataMain[index].value[i].value;
            });
            return obj;
        });

        rdm = rightdataMain[0].value.map(function (d, i) {
            var obj = {};
            obj['group'] = d.key;
            xData.forEach(function (element, index) {
                obj[element] = rightdataMain[index].value[i].value;
            });
            return obj;
        });

        plotPairedHist(ldm, rdm, xData);
        plotLegend(xData);

        $(document).on("mouseenter", ".leftrects, .rightrects", function () {
            $(this).css("stroke", "black");
        });

        $(document).on("mouseleave", ".leftrects, .rightrects", function () {
            $(this).css("stroke", "");
        });


        $(document).on("mousemove", "#pairpad", function(event) {
            var mousePositionX = event.clientX - margin.left - 5;
            //var mousePositionY = event.clientY - margin.top - 5;
            $("#tracker").attr("x1", mousePositionX).attr("x2", mousePositionX);
        });

        $(document).on("mouseenter", ".legendRect", function () {
            $(this).css("stroke", "black");
        });

        $(document).on("mouseleave", ".legendRect", function () {
            $(this).css("stroke", "");
        });

        $(document).off("click", ".legendRect");

        $(document).on("click", ".legendRect", function () {
            var id = $(this).attr("id");
            var markid = 'marker' + id.substr(2);
            var marker = $(document.getElementById(markid));
            var flag = 0;
            var tempData = [];
            $(".legendMarker").each(function () {
                if ($(this).css("display") != 'none'){
                    flag = 1;
                }
            });
            if (flag!=1){
                $(".legendMarker").each(function () {
                    if (!$(this).is(marker)){
                        $(this).css("display", "");
                    }
                    else{
                        tempData.push(findKey(labeller, id.substr(2)));
                    }
                });
                plotPairedHist(ldm, rdm, tempData);
                $(document).trigger("harsha", [tempData, flag]);
                $(document).trigger("drawVio", [tempData[0]]);
            }
            else{
                $(".legendMarker").each(function () {
                    $(this).css("display", "none");
                    plotPairedHist(ldm, rdm, xData);
                    $(document).trigger("harsha", [tempData, flag]);
                    $(document).trigger("drawVio", [ySelectedOption]);
                });
            }
        });
    });
};