# BillyBot

This is the repository of *BillyBot*, the programmable fish.

## Setup

Clone this repository.
Don't forget the submodule: `git submodule update --init`

The files in `/www` should be served using a web server ([Setting up an Apache Web Server on a Raspberry Pi](https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md)).

`/server/server.py` provides the communication backend that the browser uses to move the fish.
Install its dependencies (see `/server/requirements.txt`) and make sure it is run on startup ([for example using systemd](https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup#systemd)).

At last, set up a Wifi Hotspot so the fish can be reached.
