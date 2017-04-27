/**
 * Created by chsri on 4/2/2017.
 */

// For Y Interact
var cr = 8;
var cx = 16;
var cy = 16;
var band = 8;
var fontSize = 10;
var rwidth = 120;
var subs1 = false;
var subs2 = false;
//

// For X Interact
var xsubs = false;

transitionTime = 1000;



var xSelectedOption = "Age";
var ySelectedOption = "Total grains";

var labeller = {
    "Gender"                             : "RIAGENDR",
    "Age"                                : "RIDAGEYR",
    "Race"                               : "RIDRETH3",
     "Income"                            : "INDFMIN2" ,
    "% Federal Poverty"                  : "INDFMPIR",
     "Breast-fed infant"                 : "DRABF",
     "Citrus fruits"                     : "DR1T_F_CITMLB",
     "Fruits excluding citrus"            : "DR1T_F_OTHER",
     "Fruit juices"                      : "DR1T_F_JUICE",
     "Total fruits"                     : "DR1T_F_TOTAL",
    "Dark green vegetables"              : "DR1T_V_DRKGR",
    "Tomato products"                    : "DR1T_V_REDOR_TOMATO",
    "Red vegetables"                     : "DR1T_V_REDOR_OTHER",
    "Red and orange"                     : "DR1T_V_REDOR_TOTAL",
    "White potatoes"                     : "DR1T_V_STARCHY_POTATO",
    "Starchy vegetables"                 : "DR1T_V_STARCHY_OTHER",
    "Total starchy"                      : "DR1T_V_STARCHY_TOTAL",
    "Other vegetables"                   : "DR1T_V_OTHER",
    "Total vegetables"                   : "DR1T_V_TOTAL",
    "Beans and peas"                     : "DR1T_V_LEGUMES",
    "Whole grains"                       : "DR1T_G_WHOLE",
    "Refined grains"                     : "DR1T_G_REFINED",
    "Total grains"                       : "DR1T_G_TOTAL",
    "Meat"                               : "DR1T_PF_MEAT",
    "Cured meat"                         : "DR1T_PF_CUREDMEAT",
    "Organ meat"                         : "DR1T_PF_ORGAN",
    "Poultry meat"                       : "DR1T_PF_POULT",
    "Seafood-fattyacids(H)"             : "DR1T_PF_SEAFD_HI",
    "Seafood-fattyacids(L)"             : "DR1T_PF_SEAFD_LOW",
    "Total meat"                         : "DR1T_PF_MPS_TOTAL",
    "Eggs"                               : "DR1T_PF_EGGS",
    "Soy products"                       : "DR1T_PF_SOY",
    "Peanuts"                            : "DR1T_PF_NUTSDS",
    "Beans and peas"                     : "DR1T_PF_LEGUMES",
    "Total meat excludes legumes"        : "DR1T_PF_TOTAL",
    "Milk products"                      : "DR1T_D_MILK",
    "Yogurt"                             : "DR1T_D_YOGURT",
    "Cheeses"                            : "DR1T_D_CHEESE",
    "Total milk products"                : "DR1T_D_TOTAL",
    "Oils"                               : "DR1T_OILS",
    "Solid fats"                         : "DR1T_SOLID_FATS",
    "Added sugars"                       : "DR1T_ADD_SUGARS",
    "Alcoholic beverages"                : "DR1T_A_DRINKS"
};

var groupper = {
    "Total"              : ["Total vegetables", "Total fruits", "Total grains", "Total meat", "Total milk products","Oils",
        "Solid fats", "Added sugars", "Alcoholic beverages" ],

    "XTotal"                :["Age", "Race", "% Federal Poverty"],

    "Total vegetables"   : ["Dark green vegetables", "Tomato products","Red vegetables", "Red and orange",
        "White potatoes","Starchy vegetables", "Total starchy", "Beans and peas",  "Other vegetables"],

    "Total fruits"       : ["Citrus fruits", "Fruits excluding citrus","Fruit juices"],

    "Total grains"       : ["Whole grains","Refined grains"],

    "Total meat"         : ["Meat","Cured meat","Organ meat","Poultry meat","Seafood-fattyacids(H)","Seafood-fattyacids(L)","Eggs"],

    "Total milk products": ["Milk products","Yogurt","Cheeses"],

    "Oils"               : ["Oils" ],

    "Solid fats"         : ["Solid fats"],

    "Added sugars"       : ["Added sugars"],

    "Alcoholic beverages": ["Alcoholic beverages" ]

};



var colorsobj = {

    "Age"                               :"#1b9e77",
    "Gender"                            :"#d95f02",
    "Race"                              :"#7570b3",
    "% Federal Poverty"                            :"#e7298a",

    "Citrus fruits"                     : "#ffed6f",
    "Fruits excluding citrus"           : "#b3de69",
    "Fruit juices"                      : "#80b1d3",
    "Total fruits"                      : "#ffffb3",
    "Dark green vegetables"              : "#8dd3c7",
    "Tomato products"                    : "#fb8072",
    "Red vegetables"                     : "#bebada",
    "Red and orange"                     : "#fdb462",
    "White potatoes"                     : "#fccde5",
    "Starchy vegetables"                 : "#80b1d3",
    "Total starchy"                      : "#ccebc5",
    "Other vegetables"                   : "#ffed6f",
    "Total vegetables"                   : "#b3de69",
    "Beans and peas"                     : "#d9d9d9",
    "Whole grains"                       : "#b3de69",
    "Refined grains"                     : "#8dd3c7",
    "Total grains"                       : "#fdb462",
    "Meat"                               : "#fdb462",
    "Cured meat"                         : "#ffffb3",
    "Organ meat"                         : "#bc80bd",
    "Poultry meat"                       : "#ffed6f",
    "Seafood-fattyacids(H)"              : "#b3de69",
    "Seafood-fattyacids(L)"              : "#8dd3c7",
    "Total meat"                         : "#fb8072",
    "Eggs"                               : "#ccebc5",
    "Soy products"                       : "#d9d9d9",
    "Peanuts"                            : "#80b1d3",
    "Beans and peas"                    : "#bebada",
    "Milk products"                      : "#bc80bd",
    "Yogurt"                             : "#8dd3c7",
    "Cheeses"                            : "#ffffb3",
    "Total milk products"                : "#fccde5",
    "Oils"                               : "#ffed6f",
    "Solid fats"                         : "#fdb462",
    "Added sugars"                       : "#80b1d3",
    "Alcoholic beverages"                : "#bc80bd"

};

var colourrer = ["#66c2a5",
"#fc8d62",
"#8da0cb",
"#e78ac3",
"#a6d854",
"#ffd92f"];

function binner (group, val) {
    if (group == "RIDRETH3"){
        if (val == 1 || val == 2) {
            return "Hispanic";
        }
        else if (val == 3){
            return "Non-Hispanic White";
        }
        else if (val == 4){
            return "Non-Hispanic Black";
        }
        else if (val == 6){
            return "Non-Hispanic Asian";
        }
        else{
            return "Other";
        }
    }
    else if (group == "RIAGENDR"){
        if (val == 1){
            return "Male";
        }
        else if (val == 2){
            return "Female";
        }
        else{
            return "Undefined";
        }
    }
    else if (group == "INDFMPIR"){
        if (val >= 0 && val < 1){
            return "  0-100%";
        }
        else if (val >= 1 && val < 1.33){
            return "100-133%";
        }
        else if (val >= 1.33 && val < 1.5){
            return "133-150%";
        }
        else if (val >= 1.5 && val < 1.85){
            return "150-185%"
        }
        else if (val >= 1.85 && val < 2.00){
            return "185-200%"
        }
        else if (val >= 2.00 && val < 2.5){
            return "200-250%"
        }
        else if (val >= 2.5 && val < 3.0){
            return "250-300%"
        }
        else if (val >= 3 && val < 4){
            return "300-400%"
        }
        else if (val >= 4){
            return ":  >400%"
        }
    }
    else if (group == "RIDAGEYR") {
        // if (val >= 0  && val < 5){
        //     return " 0- 5";
        // }
        // else if (val >= 5 && val < 10){
        //     return " 5-10";
        // }
        // else if (val >= 10 && val < 15){
        //     return "10-15";
        // }
        // else if (val >= 15 && val < 20){
        //     return "15-20";
        // }
        // else if (val >= 20 && val < 25){
        //     return "20-25";
        // }
        // else if (val >= 25 && val < 30){
        //     return "25-30";
        // }
        // else if (val >= 30 && val < 35){
        //     return "30-35";
        // }
        // else if (val >= 35 && val < 40){
        //     return "35-40";
        // }
        // else if (val >= 40 && val < 45){
        //     return "40-45";
        // }
        // else if (val >= 45 && val < 50){
        //     return "45-50";
        // }
        // else if (val >= 50 && val < 55){
        //     return "50-55";
        // }
        // else if (val >= 55 && val < 60){
        //     return "55-60";
        // }
        // else if (val >= 60 && val < 65){
        //     return "60-65";
        // }
        // else if (val >= 65 && val < 70){
        //     return "65-70";
        // }
        // else if (val >= 70 && val < 75){
        //     return "70-75";
        // }
        // else if(val >= 75 && val < 80){
        //     return "75-80";
        // }
        // else if(val >= 80){
        //     return "80+";
        // }
        // else{
        //     return "Undefined";
        // }
        ///////////////////////////////////////////////////////
        if (val >= 0  && val < 10){
            return " 0-10";
        }
        else if (val >= 10 && val < 20){
            return "10-20";
        }
        else if (val >= 20 && val < 30){
            return "20-30";
        }
        else if (val >= 30 && val < 40){
            return "30-40";
        }
        else if (val >= 40 && val < 50){
            return "40-50";
        }
        else if (val >= 50 && val < 60){
            return "50-60";
        }
        else if (val >= 60 && val < 70){
            return "60-70";
        }
        else if (val >= 70 && val < 80){
            return "70-80";
        }
        else if(val >= 80){
            return "80+";
        }
        else{
            return "Undefined";
        }
    }
}

var findKey = function(obj, value)
{
    var key = null;

    for (var prop in obj)
    {
        if (obj.hasOwnProperty(prop))
        {
            if (obj[prop] === value)
            {
                key = prop;
            }
        }
    }

    return key;
};
