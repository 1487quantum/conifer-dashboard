# conifer-dashboard
A web-based dashboard for the autonomous vehicle.

##Running the dashboard
A Bash script has been written to run the dashboard. To do so, chmod <i>runserver</i> to 755 first before excecuting the script:
> $ ./runserver

##Debugging
To publish the dummy topics, use:
> $ rostopic pub /spd std_msgs/Int8 10
> $ rostopic pub /tgoal std_msgs/Int8 10

