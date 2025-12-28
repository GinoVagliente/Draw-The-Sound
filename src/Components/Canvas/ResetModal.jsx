const ResetModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#fffaf3] border-[3px] border-[#7a4b2e] rounded-3xl shadow-[6px_6px_0_#7a4b2e] p-6 w-full max-w-sm mx-5 flex flex-col items-center text-center gap-5">

        <h2 className="text-xl text-[#7a4b2e] font-bold [font-family:'Short_Stack',sans-serif]">
          Are you sure?
        </h2>

        <p className="text-[#5a3922] text-sm font-bold [font-family:'Short_Stack',sans-serif]">
          This will reset the drawing.<br />
          <span className="text-red-700">There's no way back.</span>
        </p>

        <div className="flex gap-3 w-full justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border-2 border-[#7a4b2e] text-[#7a4b2e] hover:bg-[#7a4b2e] hover:text-white transition font-bold [font-family:'Short_Stack',sans-serif]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition font-bold [font-family:'Short_Stack',sans-serif]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;
