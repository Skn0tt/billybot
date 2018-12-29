const sleep = (amt) => new Promise((resolve, reject) => {
  setTimeout(resolve, amt * 1000);
})

Blockly.Blocks["sleep"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("sleep")
        .appendField(new Blockly.FieldNumber('5'), 'LENGTH');
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    this.setColour(160);
  }
}

Blockly.JavaScript["sleep"] = function(block) {
  const amt = block.getFieldValue("LENGTH");
  return `await sleep(${amt})\n`
}


const createBlockForCommand = (cmd, name, display) => {

  Blockly.Blocks[name] = {
    init: function() {
      this.appendDummyInput()
          .appendField(display)
      this.setNextStatement(true);
      this.setPreviousStatement(true);
      this.setColour(160);
    }
  }

  Blockly.JavaScript[name] = function() {
    return `await Fish.runCommand("${cmd}")()\n`
  }

}

const mapping = [
  [ "open_mouth", "Open Mouth" ],
  [ "close_mouth", "Close Mouth" ],
  [ "lift_chest", "Lift Chest" ],
  [ "lower_chest", "Lower Chest" ],
  [ "lift_fin", "Lift Fin" ],
  [ "lower_fin", "Lower Fin" ],
  [ "flap_fin", "Flap Fin" ],
  [ "snap_mouth", "Snap Mouth" ],
];

mapping.forEach(([name, display]) => {
  createBlockForCommand(name, name, display);
})

