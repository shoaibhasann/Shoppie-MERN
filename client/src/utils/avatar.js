function generateInitialAvatar(name) {
  const canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;

  const context = canvas.getContext("2d");

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the background color
  context.fillStyle = "#ed0010";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the text
  context.fillStyle = "#FFFFFF";
  context.font = `${canvas.width / 2}px Arial`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  const initials = name.substring(0, 1).toUpperCase();
  context.fillText(initials, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
}

export { generateInitialAvatar };
