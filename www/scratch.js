const blocklyArea = document.getElementById('blocklyArea');
const blocklyDiv = document.getElementById('blocklyDiv');
const toolbox = document.getElementById("toolbox");
const workspace = Blockly.inject(
  blocklyDiv,
  {
    toolbox,
    zoom: {
      controls: true,
      wheel: true,
    },
    media: "./google-blockly/media/"
  }
);

const onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  let element = blocklyArea;
  let x = 0;
  let y = 0;

  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};

window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
Blockly.JavaScript.addReservedWords('highlightBlock');
Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';

function highlightBlock(id) {
  workspace.highlightBlock(id);
}

const runButton = document.getElementById("runBttn");

function resetHighlight() {
  workspace.highlightBlock(null);
}

function programStarted() {
  runButton.classList.add("running");
}

function programEnded() {
  resetHighlight();
  runButton.classList.remove("running");
}

const decorateWithAsync = code => `
async function program() {
  programStarted();

  ${code}

  programEnded();
}

program()
`

runButton.onclick = () => {
  runCode(code);
}

let code = "";

const runCode = code => {
  const decorated = decorateWithAsync(code);
  window.LoopTrap = 1000;
  eval(decorated);
}

const onCodeChange = () => {
  const newCode = Blockly.JavaScript.workspaceToCode(workspace);
  code = newCode;
}

workspace.addChangeListener(onCodeChange);
