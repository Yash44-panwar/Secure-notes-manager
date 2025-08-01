import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((paste) => paste._id === id);

  if (!paste) return <div className="text-center text-sm">Paste not found</div>;

  return (
    <div className="w-full min-h-screen py-6 px-2 sm:px-4 bg-white text-black overflow-x-hidden">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-y-4">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled
          className="w-full text-black border border-gray-300 rounded-md p-2 text-sm sm:text-base break-words min-w-0"
        />

        {/* Paste Box */}
        <div className="w-full flex flex-col items-start relative rounded border border-gray-300 bg-white backdrop-blur-md">
          {/* Top Header with copy */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2 border-b border-gray-300">
            <div className="w-20 h-1.5 mt-1 rounded bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-flash-bar" />

            <button
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline group"
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied!", { position: "top-right" });
              }}
            >
              <Copy size={18} className="group-hover:text-blue-600" />
              Copy
            </button>
          </div>

          {/* Content Area */}
          <textarea
            value={paste.content}
            disabled
            placeholder="Write your content here..."
            rows={20}
            className="w-full p-3 text-sm sm:text-base focus:ring-0 resize-none break-words overflow-auto min-w-0"
            style={{ caretColor: "#000" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
