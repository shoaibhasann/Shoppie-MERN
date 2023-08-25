import { createCanvas, loadImage } from "canvas";

const generateDefaultAvatar = async (firstName) => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");

  // Set background color
  ctx.fillStyle = "#ED0010";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw centered text
  ctx.fillStyle = "#fff";
  ctx.font = "bold 50px Sans";
  ctx.textAlign = "center";
  ctx.fillText(firstName.charAt(0).toUpperCase(), canvas.width / 2, canvas.height / 2 + 12);

  // Convert canvas to image buffer
  return canvas.toBuffer();
};

export default generateDefaultAvatar;
