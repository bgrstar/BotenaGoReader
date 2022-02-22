#!/bin/bash

wget "https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=500&country=all&ssl=all&anonymity=all" -O proxynofilter.txt
python checker.py