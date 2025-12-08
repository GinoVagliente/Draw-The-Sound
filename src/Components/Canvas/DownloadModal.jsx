const DownloadModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#fffaf3] border-4 border-[#7a4b2e] rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center text-center">
        <h2 className="text-lg font-semibold text-[#7a4b2e] mb-3">
          ¿Download your art?
        </h2>
        <p className="text-[#5a3922] mb-5">
          This will download your current drawing as a <b>PNG</b>.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border-2 border-[#7a4b2e] text-[#7a4b2e] hover:bg-[#7a4b2e] hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#7a4b2e] text-white hover:bg-[#60361e] transition"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
