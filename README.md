# conifer-dashboard
A web-based dashboard for the autonomous vehicle via rosbridge_suite & nodejs.

## Prerequisites
Ensure that the following is installed before running the dashboard:
### ROS
#### Main Stack
Ensure that the ROS Stack is installed

#### rosbridge_suite
Server Implementations of the rosbridge: [rosbridge_suite](https://github.com/RobotWebTools/rosbridge_suite)

Install the package via apt:
```
$ sudo apt install  sudo apt install ros-melodic-rosbridge-suite 
```

### nodejs 
To run the server, ensure that nodejs is installed. (Using version *Node.js v13.x*)
```bash 
# Using Ubuntu
$ curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
[Source: [NodeSource Node.js Binary Distributions](https://github.com/nodesource/distributions/blob/master/README.md)]

## Running the dashboard
A Bash script has been written to run the dashboard. To do so, chmod <i>runserver</i> first:
```
$ chmod 755 runserver
```
Then excecute the script:
```
$ ./runserver
```

## Debugging
To publish dummy topics, use:
```
$ rostopic pub /spd std_msgs/Int8 10
```
or
```
$ rostopic pub /tgoal std_msgs/Float64 10
```
