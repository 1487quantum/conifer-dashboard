//Subscribing to a Topic
//----------------------
// Like when publishing a topic, we first create a Topic object with details of the topic's name
// and message type. Note that we can call publish or subscribe on the same topic object.
var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/rosout',
  messageType : 'std_msgs/String'
});
// Then we add a callback to be called every time a message is published on this topic.
listener.subscribe(function(message) {
  var msg = 'Received message on ' + listener.name + ': ' + message.data;
  console.log(msg);
  document.getElementById('consl').innerHTML += msg + '\n';
  // If desired, we can unsubscribe from the topic as well.
  listener.unsubscribe();
});
