//===============================================================//
//                    SEA SNAKE OBJECT                           //
//===============================================================//
let snake = {
  skinColour: [117, 199, 164],
  detailColour: [243, 130, 74],
  borderColour: 255,
  borderStrokeWeight: 1.5,

  //============  function to create arcs
  arcs: function(x, y, w, h, start, stop, sw) {
    noFill(); 
    stroke(this.skinColour);
    strokeWeight(sw); 
    arc(x, y, w, h, start, stop); 
  },

  //============ function to create suckers
  suckers: function(centreX, centreY, arcRadius, arcDegrees, arcSW, suckerCount) {
    fill(this.skinColour); 
    stroke(this.borderColour); 
    strokeWeight(this.borderStrokeWeight);

    let suckerDistance = arcDegrees / (suckerCount - 1); 
    let suckerPosition = 180; 

    for (let i = 0; i < suckerCount; i++) { 
    
      let outerX = centreX + ((arcRadius - ((arcSW / 2) - 5)) * (Math.cos(radians(suckerPosition))));
      let outerY = centreY + ((arcRadius - ((arcSW / 2) - 5)) * (Math.sin(radians(suckerPosition))));

      suckerPosition += suckerDistance; 
 
      if (arcRadius < 40) { 
        circle(outerX, outerY, random(9, 12)); //suckers created at random sizes between 9 - 12
      } else { 
        circle(outerX, outerY, random(14, 22)); //suckers created at random sizes between 14 - 22
      } 
    } 

  },
  
  //============ function to create spikes
  spikes: function(centreX, centreY, arcRadius, arcDegrees, arcSW, spikeHeight, triangleCount) {
    fill(this.detailColour); 
    stroke(this.borderColour); 
    strokeWeight(this.borderStrokeWeight); 

    let vertCount = (triangleCount * 2) + 1; 
    let vertDistance = arcDegrees / vertCount; 
    let vertPosition = 180; 
    let arr = [];
    let r = arcRadius; 

    for (let i = 0; i < vertCount; i++) { 

      //modulus operator to find uneven numbers - every second vert point. 
      if (i % 2 != 0) { 
        r += spikeHeight; 
      } else { 
        r = arcRadius; 
      } 
      
      let x = (centreX + ((r + (arcSW / 2)) * (Math.cos(radians(vertPosition)))));
      let y = (centreY + ((r + (arcSW / 2)) * (Math.sin(radians(vertPosition)))));

      vertPosition += vertDistance; 
      arr.push(x, y); 
    } 

    //loops through array containing triangle coordinates
    for (let i = 0; i < arr.length; i += 4) { 
      if (arr[i] &&
        arr[i + 1] &&
        arr[i + 2] &&
        arr[i + 3] &&
        arr[i + 4] &&
        arr[i + 5]) { 
        
        triangle(arr[i], arr[i + 1], arr[i + 2], arr[i + 3], arr[i + 4], arr[i + 5]); 
      }
    } 

  } 

} //=== end sea snake object

function setup() {

  createCanvas(800, 600);
  background(235);

  //================================================================//
  //                        BUILD SEA SNAKE                         //
  //================================================================//

  //============  arcs (body)
  //snake.arcs(x, y, w, h, start, stop, sw)
  snake.arcs(360, 480, 460, 460, PI, PI + HALF_PI, 98); //== neck
  snake.arcs(320, 500, 120, 120, PI, TWO_PI, 60); //===== arc 1
  snake.arcs(500, 500, 80, 80, PI, TWO_PI, 50); //===== arc 2
  snake.arcs(630, 500, 60, 60, PI, TWO_PI, 40); //===== arc 3
  snake.arcs(750, 500, 60, 60, PI, 0 - HALF_PI, 30); //===== tail

  //============ suckers
  // snake.suckers(centreX, centreY, arcRadius, arcDegrees, arcSW, suckerCount);
  snake.suckers(360, 480, 230, 70, 98, 6); //== neck
  snake.suckers(320, 500, 60, 180, 60, 4); //===== arc 1
  snake.suckers(500, 500, 40, 180, 50, 3); //===== arc 2
  snake.suckers(630, 500, 30, 180, 40, 3); //===== arc 3
  snake.suckers(750, 500, 30, 90, 30, 2); //===== tail

  //============ spikes
  //snake.spikes(centreX, centreY, arcRadius, arcDegrees, arcStrokeW, spikeHeight, triangleCount)
  snake.spikes(360, 480, 230, 85, 98, 27, 11); //== neck
  snake.spikes(320, 500, 60, 180, 60, 20, 11); //===== arc 1
  snake.spikes(500, 500, 40, 180, 50, 17, 13); //===== arc 2
  snake.spikes(630, 500, 30, 180, 40, 15, 10); //===== arc 3
  snake.spikes(750, 500, 30, 110, 30, 15, 7); //===== tail

  //============ head
  //fan (ears)
  fill(snake.detailColour);
  quad(345, 200, 418, 270, 334, 315, 357, 260);
  quad(422, 144, 445, 227, 340, 195, 397, 177);
  //fan detail
  line(358, 259, 421, 270);
  line(399, 176, 451, 234);

  // jaw
  fill(snake.detailColour);
  beginShape();
  vertex(408, 315);
  vertex(438, 312);
  vertex(489, 335);
  vertex(562, 315);
  vertex(611, 329);
  vertex(600, 344);
  vertex(551, 344);
  vertex(478, 363);
  vertex(412, 320);
  endShape();

  //main head
  fill(snake.skinColour);
  beginShape();
  vertex(310, 325); //1st point
  vertex(418, 270);
  vertex(298, 155); //2nd point
  vertex(445, 227);
  vertex(411, 121); //3rd point
  vertex(506, 237);
  vertex(519, 226);
  vertex(535, 245);
  vertex(601, 253);
  vertex(630, 233);
  vertex(655, 294);
  vertex(620, 334);
  vertex(610, 325);
  vertex(562, 315);
  vertex(489, 335);
  vertex(438, 312);
  vertex(310, 325);
  endShape();

  //============ eye
  //white
  fill(255);

  beginShape();
  vertex(486, 263);
  vertex(512, 253);
  vertex(540, 273);
  vertex(541, 287);
  vertex(498, 278);
  vertex(486, 263);
  endShape();
  //pupil
  fill(130);
  rect(502, 265, 30, 15, 6); 
  fill(255);
  ellipse(512, 270, 7, 8);


} // end setup

