#!/usr/bin/env bash

sudo pigpiod -s 2 -p 3000
sudo python server.py
