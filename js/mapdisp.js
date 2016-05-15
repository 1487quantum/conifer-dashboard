/**
* Setup all visualization elements when the page is loaded.
*/
// Connect to ROS.
var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});

var el = document.getElementById('rosnet');
var nv = document.getElementById('nav');

ros.on('connection', function() {
   console.log('Connected to websocket server.');
            el.style.color = "white";
            el.style.background = "green";
            el.style.padding = "5px";
            el.innerHTML = 'Online';

 });

 ros.on('error', function(error) {
   console.log('Error connecting to websocket server: ', error);
   el.style.color = "white";
   el.style.background = "red";
   el.style.padding = "5px";
   el.innerHTML = 'Error';

 });

 ros.on('close', function() {
   console.log('Connection to websocket server closed.');
   el.style.color = "white";
   el.style.background = "Orange";
   el.style.padding = "5px";
   el.innerHTML = 'Offline';

 });

  // Create the main viewer.
  var viewer = new ROS2D.Viewer({
    divID : 'navm',
    width : 450,
    height : 850
  });

  // Setup the nav client.
    var nav = NAV2D.OccupancyGridClientNav({
      ros : ros,
      rootObject : viewer.scene,
      viewer : viewer,
      serverName : '/map'
    });

    var ctx = nv.getContext("2d");
    ctx.rotate(90*Math.PI/180);
