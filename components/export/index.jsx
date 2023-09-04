import { useState } from "react";
import { postFile } from "../../lib/Helper";
import { useMutation } from "react-query";

export default function Index() {

  const [file, setFile] = useState(null);

  const mutation = useMutation((file) => postFile(file), {
    onSuccess: () => {
      alert("Imported successfully");
    },
    onError: () => {
      alert("Imported failed");
    },
  });

  const handleFile = async () => {
    mutation.mutate(file);
  };

  return (
    <>
      <div className="space-y-1.5 relative select-none">
        <div className="space-y-1.5 -top-1.5 z-50 bg-gray-200 pt-0.5">
          <div className="flex items-center justify-between bg-[#25476A] rounded-md p-3.5">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-lg lg:text-xl font-semibold text-white tracking-wide">
                Import
              </h1>
            </div>
          </div>
          <div
            className="flex items-center bg-white rounded-md text-[#25476A] p-3.5"
          >
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button
              className="bg-[#25476A] text-white rounded-md px-3 py-1.5"
              onClick={handleFile}
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </>
  );
}