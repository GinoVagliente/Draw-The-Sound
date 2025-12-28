const DownloadModal = ({ isOpen, onConfirm, onCancel, previewImage }) => {
  if (!isOpen) return null;

  const handleUpload = () => {
    if (!previewImage) return;
    const saved = localStorage.getItem("uploadedDrawings");
    const savedTime = localStorage.getItem("uploadedDrawingsTime");
    const now = Date.now();
    let uploads = [];

    if (saved && savedTime && now - savedTime < 1000 * 60 * 1) {
      uploads = JSON.parse(saved);
    }

    uploads.push({ id: Date.now(), img: previewImage });
    localStorage.setItem("uploadedDrawings", JSON.stringify(uploads));
    localStorage.setItem("uploadedDrawingsTime", Date.now());
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#fffaf3] border-[3px] border-[#7a4b2e] rounded-3xl shadow-[6px_6px_0_#7a4b2e] p-6 w-full md:mx-15 mx-5 flex flex-col items-center text-center gap-5">
        <h2 className="text-xl text-[#7a4b2e] leading-tight font-bold [font-family:'Short_Stack',sans-serif]">
          Did you finish already?
        </h2>
        
        {previewImage && (
          <div className="w-full rounded-xl overflow-hidden border-2 border-[#7a4b2e] bg-white shadow-inner">
            <img src={previewImage} alt="Drawing preview" className="w-full h-auto" />
          </div>
        )}

        <p className="text-[#5a3922] text-sm leading-snug font-bold [font-family:'Short_Stack',sans-serif]">
          This will download your drawing as a <b>PNG</b>.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          <button
            onClick={onCancel}
            className="py-2 rounded-xl border-2 border-[#7a4b2e] text-[#7a4b2e] hover:bg-[#7a4b2e] hover:text-white transition font-bold [font-family:'Short_Stack',sans-serif]">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="py-2 rounded-xl bg-[#7a4b2e] text-white hover:bg-[#60361e] transition font-bold [font-family:'Short_Stack',sans-serif]">
            Download
          </button>

          <button
            onClick={handleUpload}
            className="col-span-2 md:col-span-1 py-2 rounded-xl bg-[#7a4b2e] text-white hover:bg-[#60361e] transition font-bold [font-family:'Short_Stack',sans-serif]">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
