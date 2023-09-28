import { useState } from "react";
import { postFile } from "../../lib/Helper";
import { useMutation } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faFileArrowUp,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
        <div className="sticky -top-0 z-50 bg-white rounded-b-md">
          <div className="text-sm breadcrumbs text-[#25476A] pl-1">
            <ul>
              <li>
                <Link href="/dashboard">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className={`w-4 h-4`}
                    title="Dashboard"
                  />
                  <span className="ml-2">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/Import">
                  <FontAwesomeIcon
                    icon={faFileArrowUp}
                    className={`w-4 h-4`}
                    title="Import"
                  />
                  <span className="ml-2">Import</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between bg-gray-700 rounded-md p-3.5">
              <div className="flex items-center space-x-3 select-none">
                <h1 className="text-base font-semibold text-gray-200 tracking-wide space-x-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faFileArrowUp}
                    className={`w-5 h-5`}
                    title="Meters"
                  />
                  <span>IMPORT</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center text-gray-700 text-sm bg-white rounded-md border border-gray-300 shadow-md p-3.5">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white rounded-md px-3 py-1.5 space-x-2 flex items-center"
                onClick={handleFile}
              >
                <FontAwesomeIcon icon={faUpload} />
                <span>Import</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
