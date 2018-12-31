const baseUrl = `${location.protocol}//${location.hostname}:3000`

const runCommand = (cmd) => async () => {
  await fetch(baseUrl, {
    method: "POST",
    body: cmd,
    mode: "no-cors"
  });
}

const Fish = {
  liftChest: runCommand("lift_chest"),
  lowerChest: runCommand("lower_chest"),
  liftFin: runCommand("lift_fin"),
  lowerFin: runCommand("lower_fin"),
  openMouth: runCommand("open_mouth"),
  closeMouth: runCommand("close_mouth"),
  flapFin: runCommand("flap_fin"),
  snapMouth: runCommand("snap_mouth"),
  runCommand,
}