var layers = [];

var square = {
  size: 80,
  pos: {
    x: 100,
    y: 100,
    z: 100,
  },
  speed: {
    x: 3,
    y: 5,
    z: -4,
  },
};

clearQueue = [];

onload = function () {
  var i; var layer = 60;
  for (i=0 ; i<120 ; i++) {
    var newCanvas = document.createElement('CANVAS');
    newCanvas.width = 500; newCanvas.height = 500;
    newCanvas.className = 'canvas';
    newCanvas.style.transform = 'rotateX(90deg) translateZ(' + layer + 'px) translateX('  + (window.innerWidth - 500) / 2  + 'px)';
    layer -= 3;
    document.body.appendChild(newCanvas);
    layers.push(newCanvas);
  }
  clearQueue.push(layers[0]);
  setInterval(intervalFunction, 30);
};

var intervalFunction = function () {
  var ctx;
  ctx = clearQueue[clearQueue.length-1].getContext('2d');
  ctx.clearRect(0, 0, 500, 500);
  ctx = layers[square.pos.z].getContext('2d');
  ctx.fillStyle = "#000";
  ctx.fillRect(square.pos.x, square.pos.y, square.size, square.size);
  clearQueue.push(layers[square.pos.z]);
  moveSquare();
};

var moveSquare = function () {
  square.pos.x += square.speed.x;
  square.pos.y += square.speed.y;
  square.pos.z += square.speed.z;
  var axes = ['x', 'y', 'z']; var j;
  for (j=0 ; j<axes.length ; j++) {
    if (square.pos[axes[j]] < 0) {
      square.speed[axes[j]] *= (-1);
      square.pos[axes[j]] = 0;
    }
    if (square.pos[axes[j]] >= 500 - square.size) {
      square.speed[axes[j]] *= (-1);
      square.pos[axes[j]] = 500 - square.size - 1;
    }
  }
  if (square.pos.z >= 120) {
    square.speed.z *= (-1);
    square.pos.z = 119;
  }
};
