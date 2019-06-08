import json

def compute(req):
  print("Hello World", req)

  val = req["in"]["data"][0]["value"]
  ret = "%s from python" % val
  print("received", ret)

  out = dict(name="who", key="name", value=ret)
  return out