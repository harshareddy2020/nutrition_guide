/**
 * Created by chsri on 4/7/2017.
 */
var drawYInteract = function(gyInteract, gyInteractHeight, gyInteractWidth) {
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = gyInteractWidth - margin.left - margin.right,
        height = gyInteractHeight - margin.top - margin.bottom;

    var main = gyInteract.append("g")
        .attr("class", "superb");

    main.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", cr)
        .attr("fill", colorsobj[ySelectedOption])
        .attr("transform", "translate (" + cr +", " + cr +")");

    main.append("rect")
        .attr("x", cx)
        .attr("y", cy)
        .attr("width", rwidth)
        .attr("height", 2*cr)
        .attr("rx", cr)
        .attr("ry", cr)
        .attr("stroke", "black")
        .attr("fill", colorsobj[ySelectedOption]);

    main.append("text")
        .attr("x", cx)
        .attr("y", cy)
        .attr("font-family", "Verdana")
        .attr("font-size", fontSize)
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "hanging")
        .attr("transform", "translate (" + cr +", 0)")
        .text(ySelectedOption);

    $(document).on("click", ".superb", function () {
        if(!subs1){
            subs1 = true;
            var selection = gyInteract.selectAll(".sub1")
                .data(groupper["Total"])
                .enter()
                .append("g")
                .attr("class", "sub1");

            selection.append("circle")
                .attr("cx", cx)
                .attr("cy", cy)
                .attr("r", cr)
                .attr("fill", function(d){return colorsobj[d];})
                .attr("transform", "translate (" + cr +", " + cr +")");

            selection.append("rect")
                .attr("display", "none")
                .attr("x", cx)
                .attr("y", cy)
                .attr("width", rwidth)
                .attr("height", 2*cr)
                .attr("rx", cr)
                .attr("ry", cr)
                .attr("stroke", "black")
                .attr("fill", function(d){return colorsobj[d];});

            selection.append("text")
                .attr("display", "none")
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
                .attr("transform", function (d, i) { return "translate ( 0, " + ((i+1)*2*cr + (i+1)*band) +" )"});
        }
        else{
            subs1 = false;
            var selection = gyInteract.selectAll(".sub1");

            selection.transition()
                .duration(1000)
                .attr("transform", "translate (0, 0)")
                .remove();
        }
    });

    $(document).on("mouseenter", ".sub1", function () {
        $(this).find(" > rect").attr("display", "");
        $(this).find(" > text").attr("display", "");
    });

    $(document).on("mouseleave", ".sub1", function () {
        $(this).find(" > rect").attr("display", "none");
        $(this).find(" > text").attr("display", "none");
    });

    $(document).on("click", ".sub1", function () {
        ySelectedOption = $(this).prop("__data__");
        redraw();
        $(".superb").trigger("click");
        gyInteract.select(".superb")
            .select("rect")
            .attr("fill", colorsobj[ySelectedOption]);
        gyInteract.select(".superb")
            .select("circle")
            .attr("fill", colorsobj[ySelectedOption]);
        gyInteract.select(".superb")
            .select("text")
            .text(ySelectedOption);
    });

    // $(document).on("mouseenter", ".sub2", function (e) {
    //     $(this).find(" > rect").attr("display", "");
    //     $(this).find(" > text").attr("display", "");
    //     e.stopPropagation();
    // });
    //
    // $(document).on("mouseleave", ".sub2", function (e) {
    //     $(this).find(" > rect").attr("display", "none");
    //     $(this).find(" > text").attr("display", "none");
    //     e.stopPropagation();
    // });
    //
    // $(document).on("click", ".sub2", function () {
    //     ySelectedOption = $(this).prop("__data__");
    //     redraw();
    //     $(".superb").trigger("click");
    //     gyInteract.select(".superb")
    //         .select("rect")
    //         .attr("fill", colorsobj[ySelectedOption]);
    //     gyInteract.select(".superb")
    //         .select("circle")
    //         .attr("fill", colorsobj[ySelectedOption]);
    //     gyInteract.select(".superb")
    //         .select("text")
    //         .text(ySelectedOption);
    // })


};
