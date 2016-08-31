# conifer-dashboard
A web-based dashboard for the autonomous vehicle.

To run the dashboard, chmod <i>runserver</i> to 755 & run the script:
$ ./runserver

To publish the dummy topics, use:
$ rostopic pub /spd std_msgs/Int8 10
$ rostopic pub /tgoal std_msgs/Int8 10

