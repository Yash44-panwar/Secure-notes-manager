import { Calendar, Copy, Eye, PencilLine, Trash2, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { FormatDate } from "../utlis/formateDate";
import { removeFromPastes } from "../redux/pasteSlice";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes || []);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/pastes/${id}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this paste",
          url,
        })
        .catch(() => {
          toast.error("Sharing cancelled or failed");
        });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  const filteredPastes = pastes.filter((paste) =>
    paste?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen py-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      {" "}
      {/* for full-page responsive layout */}
      <div className="flex flex-col gap-y-3">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
          <input
            type="search"
            placeholder="Search Notes here..."
            className="focus:outline-none w-full bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-left border-b border-[rgba(128,121,121,0.3)] pb-4 text-purple-600 tracking-wide">
            
            {/* Responsive text size */}
            📝 All Notes
          </h2>

          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-[rgba(128,121,121,0.3)] w-full flex flex-col sm:flex-row justify-between gap-4 sm:gap-y-0 p-4 rounded-[0.3rem]"
                >
                  {/* Title and Content */}
                  <div className="w-full sm:w-[60%] flex flex-col space-y-3">
                    <p className="text-xl font-semibold text-left text-gray-800">
                      {paste?.title}
                    </p>
                    <p className="text-sm font-normal line-clamp-3 text-[#707070] text-left">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-y-4 sm:items-end w-full sm:w-[40%]">
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {" "}
                      {/*Responsive button layout */}
                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500">
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>
                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500">
                        <a
                          href={`/pastes/${paste?._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content || "");
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-purple-500"
                        onClick={() => handleShare(paste?._id)}
                      >
                        <Share2
                          className="text-black group-hover:text-purple-500"
                          size={20}
                        />
                      </button>
                    </div>

                    <div className="gap-x-2 flex items-center justify-start sm:justify-end">
                      <Calendar className="text-black" size={20} />
                      <span className="text-sm">
                        {FormatDate(paste?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
