
//Network stats
var el = document.getElementById('rosnet');
//Telemetry & Pose
var vspd = document.getElementById('spd');
var vgoal = document.getElementById('dist');
var vpos = document.getElementById('pos');
var vobs = document.getElementById('obs');

//Dashboard type
var pageType = document.getElementById('wType');

//Textarea
var logTxt = document.getElementById('consl');

//Buttons
var btnRoute = document.getElementById("txtRoute");
var btnBrakes = document.getElementById("btnBrakes");
var btnRes = document.getElementById("btnRes");

//Date time var
var d = new Date();
var n = d.toLocaleTimeString();

//
var stat = 0; //States: 0-> Offline, 1-> Online, 2->Error
var wType = 0; //Web dashboard type: 0-> Server, 1-> Client
var cStats;   //Connection stats

if(pageType.innerHTML=="Client"){
  wType=1;
}else{
  wType=0;
}

//Server mode
if(wType==0){
  // Connect to ROS.
  //Connection status
  var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
  });

  ros.on('connection', function() {
    cStats = 'Connected to websocket server.\n'
    console.log(cStats);
    logStat(cStats);

    //Enable brake buttons
    btnDisabled(false,true);
    updateNetStat("white","green","5px",'Online');

  });

  ros.on('error', function(error) {
    cStats='Error connecting to websocket server.\n';
    console.log(cStats,error);
    logStat(cStats);

    //Disable all buttons
    btnDisabled(true,true);
    updateNetStat("white","red","5px",'Error');
  });

  ros.on('close', function() {
    cStats='Connection to websocket server closed.\n';
    console.log(cStats);
    logStat(cStats);

    //Disable all buttons
    btnDisabled(true,true);
    updateNetStat("white","orange","5px",'Offline');
  });

  // Subscribers
  //Speed
  var tSpd = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_velF',
    messageType : 'geometry_msgs/Twist'
  });
  tSpd.subscribe(function(message) {
    var x = message.linear.x;
    var y = message.angular.z;
    var res = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    if(x<0){
      res = -res;
    }
    console.log('Received speed ' + tSpd.name + ': %f',res);
    vspd.innerHTML = parseFloat(res).toFixed(2);
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

  //Robot Pose
  var tPose = new ROSLIB.Topic({
    ros : ros,
    name : '/robot_pose',
    messageType : 'geometry_msgs/PoseStamped'
  });
  tPose.subscribe(function(message) {
    var x = parseFloat(message.pose.position.x).toFixed(2);
    var y = parseFloat(message.pose.position.y).toFixed(2);

    console.log('Robot location (x,y):' + x+", "+y);
    vpos.innerHTML = x + ", "+y
  });

  //Obstacle Status
  var tObs = new ROSLIB.Topic({
    ros : ros,
    name : '/obstacle',
    messageType : 'std_msgs/Bool'
  });
  tObs.subscribe(function(message) {
    console.log('Obstacle?' + ' %s',message.data);
    vobs.innerHTML = message.data;
  });

  //Publishers
  //Set route
  function goToRoute(rt){
    var routePub = new ROSLIB.Topic({
      ros : ros,
      name : '/route',
      messageType : 'std_msgs/Int32'
    });

    var routeNum = new ROSLIB.Message({
      data: rt
    });
    routePub.publish(routeNum);
  }

  //Emergency Brake
  function btnEBrake() {
    d = new Date();
    n = d.toLocaleTimeString();
    //Shows time activated
    logStat("Emergency brake activated.\n");

    //Disable current btn & Enable btn Resume
    btnDisabled(true,false);

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
  }

  //Resume
  function btnResume() {
    logStat("Route resumed.\n");

    //Disable current btn & Enable btn brakes
    btnDisabled(false,true);

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
}

function updateNetStat(clr, bg, pad, txt){
  el.style.color = clr;
  el.style.background = bg;
  el.style.padding = pad;
  el.innerHTML = txt;
}



//var ctx = nv.getContext("2d");
//ctx.rotate(90*Math.PI/180);

//Run fx when page is loaded
function bodyOnLoad(){
  logStat(pageType.innerHTML+" Dashboard loaded.\n");
}
window.onload = bodyOnLoad();

//Log events
function logStat(stat){
  d = new Date();
  n = d.toLocaleTimeString();
  logTxt.value +="["+n+"] "+stat;
  logTxt.scrollTop = logTxt.scrollHeight;
}

//Button States
function btnDisabled(btnB, btnR){
  btnBrakes.disabled = btnB;
  btnRes.disabled = btnR;
}

//Update spinner/dropdown box
function dropdown(val) {
  btnRoute.innerHTML = val;
  logStat("Selected route ->"+val+"\n");
}

function startRoute(){
  var route = btnRoute.innerHTML;
  if(route=="Route 1"){
    goToRoute(1);
  }else if(route=="Route 2"){
    goToRoute(2);
  }
  logStat("Navigating to "+route+"\n");

}
