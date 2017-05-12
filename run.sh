#!/usr/bin/env bash

sudo pigpiod -s 2 -p 3000
# export LD_LIBRARY_PATH=/home/pi/mjpg-streamer/mjpg-streamer-experimental/
# mjpg_streamer -o "output_http.so -p 4000" -i "input_raspicam.so -x 640 -y 480 -fps 30 -ex sports -q 10" &
sudo python server.py
