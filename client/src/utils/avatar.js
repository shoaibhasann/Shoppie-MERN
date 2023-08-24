
function generateInitialAvatar(name) {
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;

  const context = canvas.getContext("2d");


  context.fillStyle = "#ed0010";
  context.fillRect(0, 0, 100, 100);
  context.fillStyle = "#FFFFFF";
  context.font = `${100 / 2}px Arial`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  const initials = name.substring(0, 1).toUpperCase();
  context.fillText(initials, 100 / 2, 100 / 2);

  return canvas.toDataURL(); 
}

export {
  generateInitialAvatar
}


