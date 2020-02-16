var w = 1000;
var h = 3300;

function preload()
{
  table = loadTable("Countries-BMI-Data.csv","csv","header");
}

function setup() {
  createCanvas(w,h);
  console.log(table.getRowCount() + " total rows in table");
  console.log(table.getColumnCount() + " total columns in table");

  countries = table.getColumn("Country");
  meanBMI = table.getColumn("Overall mean BMI (kg/m2)").map(Number);
  femaleBMI = table.getColumn("Female mean BMI (kg/m2)").map(Number);
  maleBMI = table.getColumn("Male mean BMI (kg/m2)").map(Number);

  minBMI = min(min(femaleBMI), min(maleBMI));
  maxBMI = max(max(femaleBMI), max(maleBMI));

  //define some drawing parameters
  textFont('Árial');
  fontHeight = 14;
  rowHeight = 30;
  rightMargin = 200;
}

function draw() {
  background(30);

  y = 2*rowHeight;

  textSize(fontHeight);
  longestLabelLength = calculateLongestLabelLength(countries);

  for(var i = 0; i < countries.length; i++)
  {
    fill(255);
    noStroke();

    textAlign(RIGHT, CENTER);
    text(countries[i], longestLabelLength, y);

    //draw the line
    stroke(255);
    var linex1 = longestLabelLength + 5;
    var linex2 = w-rightMargin;

    line(linex1, y, linex2, y);

    y = y + rowHeight;
  }

}

function calculateLongestLabelLength(labels){

  longestLabelLength = 0;
  for (var i = 0; i < labels.length; i++)
  {
      tw = textWidth(labels[i]);
      if (tw > longestLabelLength) longestLabelLength = tw;
  }

  return longestLabelLength;
}