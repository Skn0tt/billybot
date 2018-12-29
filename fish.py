#! /usr/bin/env python3

from gpiozero import PWMOutputDevice 
from gpiozero import DigitalOutputDevice
from gpiozero import Motor
import time
import math

STBY = 19

MOTOR_A_PWM = 12
MOTOR_A_FORWARD = 5
MOTOR_A_REVERSE = 6

MOTOR_B_PWM = 13
MOTOR_B_FORWARD = 20
MOTOR_B_REVERSE = 16

stby = DigitalOutputDevice(STBY)
stby.value = True

motorA = Motor(MOTOR_A_FORWARD, MOTOR_A_REVERSE, pwm=False)
driveA = PWMOutputDevice(MOTOR_A_PWM, active_high=True, initial_value=0, frequency=1000)
motorB = Motor(MOTOR_B_FORWARD, MOTOR_B_REVERSE, pwm=False)
driveB = PWMOutputDevice(MOTOR_B_PWM, active_high=True, initial_value=0, frequency=1000)

def get_devices(m):
  if m == "a":
    return motorA, driveA
  else:
    return motorB, driveB

def move_motor(m, speed):
  motor, drive = get_devices(m)
  drive.value = math.fabs(speed)
  if speed < 0:
    motor.backward()
  else:
    motor.forward()

def stop_motor(m):
  motor, drive = get_devices(m)
  motor.stop()

def open_mouth():
  print("[mouth] opening...")
  move_motor("a", 1)

def close_mouth():
  print("[mouth] closing...")
  stop_motor("a")

def snap_mouth():
  open_mouth()
  time.sleep(0.2)
  close_mouth()
  time.sleep(0.2)

def lift_fin():
  print("[fin] lifting...")
  move_motor("b", -1)

def lower_fin():
  print("[fin] lowering...")
  stop_motor("b")

def lift_chest():
  print("[chest] lifting...")
  move_motor("b", 1)

def lower_chest():
  print("[chest] lowering...")
  stop_motor("b")

def flap_fin():
  lift_fin()
  time.sleep(0.2)
  lower_fin()
  time.sleep(0.2)

def reset():
  lower_fin()
  close_mouth()
  lower_chest()
  time.sleep(0.2)
