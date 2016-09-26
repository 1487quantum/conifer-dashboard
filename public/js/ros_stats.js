
// Connect to ROS.
var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});

var el = document.getElementById('rosnet');
var vspd = document.getElementById('spd');
var vgoal = document.getElementById('dist');



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

 // Publishing a Topic
  /* ------------------

  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_vel',
    messageType : 'geometry_msgs/Twist'
  });

  var twist = new ROSLIB.Message({
    linear : {
      x : 0.1,
      y : 0.2,
      z : 0.3
    },
    angular : {
      x : -0.1,
      y : -0.2,
      z : -0.3
    }
  });
  cmdVel.publish(twist);

*/

  // Subscribers

  //Speed
  var tSpd = new ROSLIB.Topic({
    ros : ros,
    name : '/speed',
    messageType : 'std_msgs/Float64'
  });

  tSpd.subscribe(function(message) {
    console.log('Received speed ' + tSpd.name + ': %i',message.data);
    vspd.innerHTML = parseFloat(message.data).toFixed(2);
    //tSpd.unsubscribe();
  });

  //Distance to goal
  var tGoal = new ROSLIB.Topic({
    ros : ros,
    name : '/tgoal',
    messageType : 'std_msgs/Float64'
  });

  tGoal.subscribe(function(message) {
    console.log('Received distance to goal on ' + tGoal.name + ': %i',message.data);
    vgoal.innerHTML = parseFloat(message.data).toFixed(2);


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



  function myFunction() {
    var d = new Date();
    var n = d.toLocaleTimeString();
      document.getElementById("eStop").innerHTML = "Emergency brake activated at "+n;
      var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : '/stop_vel',
        messageType : 'geometry_msgs/Twist'
      });

      var eBrake = new ROSLIB.Topic({
        ros : ros,
        name : '/pause_navigation',
        messageType : 'std_msgs/Bool'
      });

      var msg = new ROSLIB.Message({
      data: true
      });

      var twist = new ROSLIB.Message({
        linear : {
          x : 0.0,
          y : 0.0,
          z : 0.0
        },
        angular : {
          x : 0.0,
          y : 0.0,
          z : 0.0
        }
      });
      cmdVel.publish(twist);
      eBrake.publish(msg);

    }d
    function myFunction2() {
      var d = new Date();
      var n = d.toLocaleTimeString();
      document.getElementById("resume").innerHTML = "Resumed at "+n;

        var eBrake = new ROSLIB.Topic({
          ros : ros,
          name : '/pause_navigation',
          messageType : 'std_msgs/Bool'
        });

        var msg = new ROSLIB.Message({
        data: false
        });

        eBrake.publish(msg);

      }
    //var ctx = nv.getContext("2d");
    //ctx.rotate(90*Math.PI/180);
