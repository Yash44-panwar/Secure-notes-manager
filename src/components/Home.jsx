import React, { useEffect, useState } from "react";
import { Copy, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updatePastes } from "../redux/pasteSlice";

console.log({ addToPastes, updatePastes });

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteID = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteID) {
      const paste = allPastes.find((p) => p._id === pasteID);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteID, allPastes]);

  //  Define this BEFORE the return statement
  function resetPaste() {
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  function create() {
    if (!title.trim()) {
      toast.error("Please enter a title for the note");
      return;
    }

    if (!value.trim()) {
      toast.error("Please enter some content");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteID || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteID) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="w-full min-h-screen py-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 bg-gray-100 text-gray-800">
      {/*  Responsive container */}
      <div className="w-full max-w-[1200px] mx-auto rounded-xl shadow-md flex flex-col gap-y-6">
        {/* Flex-wrap support for mobile */}
        <div className="w-full flex flex-col sm:flex-row gap-y-4 sm:gap-x-4 justify-between items-stretch sm:items-center">
          <input
            type="text"
            placeholder="Enter Your Notes Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full sm:w-[70%] text-black border border-input rounded-md p-2"
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="text-white bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-teal-600 hover:to-green-600 focus:ring-4 focus:ring-green-300 font-semibold rounded-xl text-sm px-6 py-2.5 shadow-md transition duration-300"
              onClick={create}
            >
              {pasteID ? "Update Paste" : "Create"}
            </button>

            {pasteID && (
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={resetPaste}
              >
                <PlusCircle size={20} />
              </button>
            )}
          </div>
        </div>

        {/*Content Box */}
        <div className="w-full flex flex-col items-start relative rounded bg-white shadow-md border border-gray-300">
          <div className="w-full flex items-center justify-between px-4 py-2 border-b border-gray-300">
            <div className="w-full flex gap-x-[6px] items-center select-none">
              <div className="w-24 h-1.5 mt-2 ml-4 rounded bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flash-bar" />
            </div>

            <div className="flex justify-end items-center">
              <button
                className="flex justify-center items-center gap-1 text-sm text-blue-600 hover:underline transition duration-300 group"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied", { position: "top-right" });
                }}
              >
                <Copy size={18} className="group-hover:text-blue-600" />
                Copy
              </button>
            </div>
          </div>

          {/*  Responsive TextArea */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full p-4 text-sm resize-none h-[300px] sm:h-[400px] outline-none focus:ring-0"
            style={{ caretColor: "#000" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
