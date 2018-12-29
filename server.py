#! /usr/bin/env python3

from http.server import BaseHTTPRequestHandler, HTTPServer
import fish

fish.reset()

chest_lifted = False
mouth_opened = False
fin_lifted = False

def open_mouth():
  global mouth_opened

  if not mouth_opened:
    fish.open_mouth()
    mouth_opened = True

def close_mouth():
  global mouth_opened

  if mouth_opened:
    fish.close_mouth()
    mouth_opened = False

def lift_chest():
  global chest_lifted

  lower_fin()

  if not chest_lifted:
    fish.lift_chest()
    chest_lifted = True

def lower_chest():
  global chest_lifted
  global fin_lifted

  if chest_lifted:
    fish.lower_chest()
    chest_lifted = False
    fin_lifted = False

def lift_fin():
  global fin_lifted

  lower_chest()

  if not fin_lifted:
    fish.lift_fin()
    fin_lifted = True

def lower_fin():
  global chest_lifted
  global fin_lifted
  
  if fin_lifted:
    fish.lower_fin()
    fin_lifted = False
    chest_lifted = False

def flap_fin():
  lower_chest()
  lower_fin()
  fish.flap_fin()

def snap_mouth():
  close_mouth()
  fish.snap_mouth()

actions = {
  "open_mouth": open_mouth,
  "close_mouth": close_mouth,
  "lift_chest": lift_chest,
  "lower_chest": lower_chest,
  "lift_fin": lift_fin,
  "lower_fin": lower_fin,
  "flap_fin": flap_fin,
  "snap_mouth": snap_mouth,
}

def get_body(self):
  content_len = int(self.headers.get('Content-Length'))
  b_body = self.rfile.read(content_len)
  body = b_body.decode("utf-8")
  return body

class S(BaseHTTPRequestHandler):
  def do_POST(self):
    command = get_body(self)
    if command in actions:
      function = actions[command]
      function()
      self.send_response(200)
    else:
      self.send_response(404)
    self.end_headers()
    return

def run(port=3000):
  server_address = ('', port)
  httpd = HTTPServer(server_address, S)
  print('Starting httpd...')
  httpd.serve_forever()

if __name__ == "__main__":
  from sys import argv

  if len(argv) == 2:
    run(port=int(argv[1]))
  else:
    run()
