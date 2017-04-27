/**
 * Created by chsri on 4/8/2017.
 */
var drawXInteract = function(gxInteract, gxInteractHeight, gxInteractWidth) {
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = gxInteractWidth - margin.left - margin.right,
        height = gxInteractHeight - margin.top - margin.bottom;

    var main = gxInteract.append("g")
        .attr("class", "xsuperb");

    main.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", cr)
        .attr("fill", colorsobj[xSelectedOption])
        .attr("transform", "translate (" + cr +", " + cr +")");

    main.append("rect")
        .attr("x", cx)
        .attr("y", cy)
        .attr("width", rwidth)
        .attr("height", 2*cr)
        .attr("rx", cr)
        .attr("ry", cr)
        .attr("stroke", "black")
        .attr("fill", colorsobj[xSelectedOption]);

    main.append("text")
        .attr("x", cx)
        .attr("y", cy)
        .attr("font-family", "Verdana")
        .attr("font-size", fontSize)
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "hanging")
        .attr("transform", "translate (" + cr +", 0)")
        .text(xSelectedOption);

    $(document).on("click", ".xsuperb", function () {
        if(!xsubs){
            xsubs = true;
            var selection = gxInteract.selectAll(".xsubs")
                .data(groupper["XTotal"])
                .enter()
                .append("g")
                .attr("class", "xsubs");

            selection.append("circle")
                .attr("cx", cx)
                .attr("cy", cy)
                .attr("r", cr)
                .attr("fill", function(d){return colorsobj[d];})
                .attr("transform", "translate (" + cr +", " + cr +")");

            selection.append("rect")
                .attr("x", cx)
                .attr("y", cy)
                .attr("width", rwidth)
                .attr("height", 2*cr)
                .attr("rx", cr)
                .attr("ry", cr)
                .attr("stroke", "black")
                .attr("fill", function(d){return colorsobj[d];});

            selection.append("text")
                .attr("x", cx)
                .attr("y", cy)
                .attr("font-family", "Verdana")
                .attr("font-size", fontSize)
                .attr("text-anchor", "start")
                .attr("dominant-baseline", "hanging")
                .attr("transform", "translate (" + cr +", 0)")
                .text(function(d){return d;});

            selection.transition()
                .duration(1000)
                .attr("transform", function (d, i) { return "translate (" + ((i+1)*rwidth + (i+1)*band) +", 0 )"});
        }
        else{
            xsubs = false;

            var selection = gxInteract.selectAll(".xsubs");

            selection.transition()
                .duration(1000)
                .attr("transform", "translate (0, 0)")
                .remove();
        }
    });

    $(document).on("click", ".xsubs", function () {
        xSelectedOption = $(this).prop("__data__");
        redraw();
        $(".xsuperb").trigger("click");
        gxInteract.select(".xsuperb")
            .select("rect")
            .attr("fill", colorsobj[xSelectedOption]);
        gxInteract.select(".xsuperb")
            .select("circle")
            .attr("fill", colorsobj[xSelectedOption]);
        gxInteract.select(".xsuperb")
            .select("text")
            .text(xSelectedOption);
    })


};