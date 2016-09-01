# conifer-dashboard
A web-based dashboard for the autonomous vehicle.

##Running the dashboard
A Bash script has been written to run the dashboard. To do so, chmod <i>runserver</i> first:
```
$ chmod 755 runserver
```
Then excecute the script:
```
$ ./runserver
```

##Debugging
To publish dummy topics, use:
```
$ rostopic pub /spd std_msgs/Int8 10
```
or
```
$ rostopic pub /tgoal std_msgs/Float64 10
```
