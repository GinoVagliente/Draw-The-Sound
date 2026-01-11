import { useNavigate } from "react-router-dom";

const DownloadModal = ({ isOpen, onConfirm, onCancel, previewImage }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpload = () => {
    if (!previewImage) return;

    const saved = localStorage.getItem("uploadedDrawings");
    const savedTime = localStorage.getItem("uploadedDrawingsTime");
    const now = Date.now();
    let uploads = [];

    if (saved && savedTime && now - savedTime < 1000 * 60 * 5) {
      uploads = JSON.parse(saved);
    }

    uploads.push({ id: Date.now(), img: previewImage });
    localStorage.setItem("uploadedDrawings", JSON.stringify(uploads));
    localStorage.setItem("uploadedDrawingsTime", Date.now());

    onCancel();
    navigate("/Rate");
  };

  const handleDownload = () => {
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative group w-full max-w-md">
        <div className="absolute top-3 right-3 w-full h-full rounded-3xl bg-[#7a4b2e] opacity-25 z-0 transition-transform duration-300 group-hover:scale-[1.01]" />

        <div className="relative z-10 bg-gradient-to-b from-[rgb(255,233,214)] to-[rgb(255,204,183)] border-[4px] border-[#7a4b2e] rounded-3xl p-6 flex flex-col items-center gap-5 text-center overflow-hidden">

          <span className="absolute left-4 top-4 w-2 h-2 bg-white/60 rounded-full" />
          <span className="absolute left-7 top-7 w-1.5 h-1.5 bg-white/50 rounded-full" />
          <span className="absolute right-6 top-6 w-2 h-2 bg-white/50 rounded-full" />
          <span className="absolute right-4 bottom-4 w-3 h-3 bg-white/40 rounded-full" />

          <h2 className="text-2xl text-[#7a4b2e] font-bold leading-tight [font-family:'Short_Stack',sans-serif]">
            Finished your drawing?
          </h2>

          {previewImage && (
            <div className="w-full rounded-2xl overflow-hidden border-3 border-[#7a4b2e] bg-white">
              <img
                src={previewImage}
                alt="Drawing preview"
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          <p className="text-[#5a3922] text-sm font-bold [font-family:'Short_Stack',sans-serif]">
            Your artwork will be saved as a <b>PNG</b>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full mt-2">

            <button
              onClick={onCancel}
              className="py-2 rounded-xl border-2 border-[#7a4b2e] text-[#7a4b2e] hover:bg-[#7a4b2e] hover:text-white transition font-bold [font-family:'Short_Stack',sans-serif]"
            >
              Cancel
            </button>

            <button
              onClick={handleDownload}
              className="py-2 rounded-xl bg-[#7a4b2e] text-white hover:bg-[#60361e] transition font-bold [font-family:'Short_Stack',sans-serif]"
            >
              Download
            </button>

            <button
              onClick={handleUpload}
              className="col-span-2 md:col-span-1 py-2 rounded-xl bg-[#7a4b2e] text-white hover:bg-[#60361e] transition font-bold [font-family:'Short_Stack',sans-serif]"
            >
              Upload
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
