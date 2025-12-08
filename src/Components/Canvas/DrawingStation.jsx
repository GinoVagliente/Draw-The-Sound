import { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { GrRedo, GrUndo, GrPowerReset, GrDownload } from "react-icons/gr";
import { FaPen, FaEraser } from "react-icons/fa";
import { MdOpacity } from "react-icons/md";
import DownloadModal from "./DownloadModal";

const DrawingStation = () => {
  const canvasRef = useRef(null);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [eraserWidth, setEraserWidth] = useState(15);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [canvasColor, setCanvasColor] = useState("#ffffff");
  const [lastColor, setLastColor] = useState("#000000");
  const [isErasing, setIsErasing] = useState(false);
  const [strokeOpacity, setStrokeOpacity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStrokeColorChange = (event) => {
    setStrokeColor(event.target.value);
    setLastColor(event.target.value);
  };

  const handleCanvasColorChange = (event) => setCanvasColor(event.target.value);
  const handleUndoClick = () => canvasRef.current?.undo();
  const handleRedoClick = () => canvasRef.current?.redo();
  const handleResetClick = () => canvasRef.current?.resetCanvas();

  const handlePenClick = () => {
    setStrokeColor(lastColor);
    setIsErasing(false);
  };

  const handleEraserClick = () => {
    setLastColor(strokeColor);
    setStrokeColor("#ffffff");
    setIsErasing(true);
  };

  const colorWithOpacity = (hex) => {
    if (isErasing) return "#ffffff";
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${strokeOpacity})`;
  };

  const handleStrokeWidthChange = (event) => setStrokeWidth(+event.target.value);
  const handleEraserWidthChange = (event) => setEraserWidth(+event.target.value);

  const openDownloadModal = () => setIsModalOpen(true);
  const closeDownloadModal = () => setIsModalOpen(false);

  const confirmDownload = async () => {
    setIsModalOpen(false);
    try {
      const dataUrl = await canvasRef.current.exportImage("png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "drawing.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar la imagen:", error);
    }
  };

  const presetColors = [
    "#000000", "#4a4a4a", "#7a7a7a", "#bfbfbf", "#ffffff",
    "#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#00ffff",
    "#0000ff", "#8a2be2", "#ff00ff", "#ff1493", "#a52a2a",
    "#8b4513", "#228b22", "#008080", "#4682b4", "#ffc0cb",
  ];

  return (
    <div className="relative w-full h-[80vh] border-8 border-[#7a4b2e] rounded-xl overflow-hidden md:mx-15 mx-5 flex flex-col">

      <div className="flex-1">
        <ReactSketchCanvas
          ref={canvasRef}
          strokeWidth={isErasing ? eraserWidth : strokeWidth}
          strokeColor={colorWithOpacity(strokeColor)}
          canvasColor={canvasColor}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="w-full bg-[#f5e6d3]/90 backdrop-blur-sm flex flex-wrap items-center justify-center gap-4 py-3 border-t-4 border-[#7a4b2e]">

        <div className="flex gap-2 flex-nowrap items-center flex-row md:flex-col">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePenClick}
              className={`p-2 rounded-full ${!isErasing ? "bg-[#7a4b2e] text-white" : "bg-white text-[#7a4b2e]"}`}
            >
              <FaPen />
            </button>
            <input
              type="range"
              min="1"
              max="20"
              value={strokeWidth}
              onChange={handleStrokeWidthChange}
              className="w-16 md:w-25 accent-[#7a4b2e]"
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleEraserClick}
              className={`p-2 rounded-full ${isErasing ? "bg-[#7a4b2e] text-white" : "bg-white text-[#7a4b2e]"}`}
            >
              <FaEraser />
            </button>
            <input
              type="range"
              min="5"
              max="40"
              value={eraserWidth}
              onChange={handleEraserWidthChange}
              className="w-16 md:w-25 accent-[#7a4b2e]"
            />
          </div>

          <div className="flex items-center gap-1">
            <label className="p-2 bg-[#7a4b2e] rounded-full text-white">
              <MdOpacity />
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={strokeOpacity}
              onChange={(e) => setStrokeOpacity(+e.target.value)}
              className="w-16 md:w-25 accent-[#7a4b2e]"
            />
          </div>
        </div>

        <div className="grid grid-cols-10 gap-1 max-w-[300px] justify-items-center">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => {
                setStrokeColor(color);
                setLastColor(color);
                setIsErasing(false);
              }}
              className={`w-6 h-6 rounded-full border-2 border-[#7a4b2e] transition hover:scale-110 ${strokeColor === color ? "ring-2 ring-[#7a4b2e]" : ""}`}
              style={{ backgroundColor: color }}
            />
          ))}

          <div className="col-span-10 w-full flex justify-center mt-1">
            <input
              type="color"
              value={strokeColor}
              onChange={handleStrokeColorChange}
              title="Color personalizado"
              className="w-1/2 h-8"
            />
            <input
              type="color"
              value={canvasColor}
              onChange={handleCanvasColorChange}
              title="Color del fondo"
              className="w-1/2 h-8"
            />
          </div>
        </div>

        <div className="flex gap-2 ml-2">
          <button
            onClick={handleUndoClick}
            className="p-2 bg-white text-[#7a4b2e] rounded-full hover:bg-[#7a4b2e] hover:text-white transition"
          >
            <GrUndo />
          </button>
          <button
            onClick={handleRedoClick}
            className="p-2 bg-white text-[#7a4b2e] rounded-full hover:bg-[#7a4b2e] hover:text-white transition"
          >
            <GrRedo />
          </button>
          <button
            onClick={handleResetClick}
            className="p-2 bg-white text-[#7a4b2e] rounded-full hover:bg-[#7a4b2e] hover:text-white transition"
          >
            <GrPowerReset />
          </button>

          <button
            onClick={openDownloadModal}
            className="p-2 bg-white text-[#7a4b2e] rounded-full hover:bg-[#7a4b2e] hover:text-white transition"
            title="Descargar dibujo"
          >
            <GrDownload />
          </button>
        </div>
      </div>

      <DownloadModal
        isOpen={isModalOpen}
        onConfirm={confirmDownload}
        onCancel={closeDownloadModal}
      />
    </div>
  );
};

export default DrawingStation;
