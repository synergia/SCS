#!/usr/bin/env bash

sudo pigpiod -p 3000
sudo python server.py
