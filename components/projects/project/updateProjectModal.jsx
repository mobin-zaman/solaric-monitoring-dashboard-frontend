//Completed: Yes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCubesStacked } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateProject } from "@/lib/Helper";
import { uploadImage } from "@/lib/Helper";
import Image from "next/image";

export default function AddUserModal({
  updateProjectModalOpen,
  projectUpdated,
  editProjectData,
}) {
  console.log(editProjectData);
  const queryClient = useQueryClient();
  const [name, setName] = useState(editProjectData?.name);
  const [fundingType, setFundingType] = useState(editProjectData?.fundingType);
  const [tarrif, setTarrif] = useState(editProjectData?.tarrif);
  const [dollarRate, setDollarRate] = useState(editProjectData?.dollarRate);
  const [exportMeterSerialNumber, setExportMeterSerialNumber] = useState(
    editProjectData?.exportMeterSerialNumber
  );
  const [importMeterSerialNumber, setImportMeterSerialNumber] = useState(
    editProjectData?.importMeterSerialNumber
  );
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(updateProject, {
    onSuccess: () => {
      projectUpdated(true);
      updateProjectModalOpen(false);
      queryClient.invalidateQueries("project", "projects");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageSrc(URL.createObjectURL(selectedFile));
  };

  const handleCreateProject = (e) => {
    projectUpdated(false);
    setErrorMessage("");
    if (
      !name ||
      !fundingType ||
      !tarrif ||
      !dollarRate ||
      !exportMeterSerialNumber ||
      !importMeterSerialNumber
    ) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target.result.split(",")[1]; // Extract base64 portion

        try {
          const response = await uploadImage(base64Data);
          mutation.mutate({
            id: editProjectData?.id,
            name,
            fundingType,
            tarrif: parseFloat(tarrif),
            dollarRate: parseFloat(dollarRate),
            exportMeterSerialNumber,
            importMeterSerialNumber,
            imageUrl: response.data.url,
          });
          // Do something with the uploaded image data, such as displaying it or further processing
        } catch (error) {
          console.error("Error uploading image:", error);
          setUploadedImageUrl("Error uploading image");
        }
      };
      reader.readAsDataURL(file);
    } else {
      mutation.mutate({
        id: editProjectData?.id,
        name,
        fundingType,
        tarrif: parseFloat(tarrif),
        dollarRate: parseFloat(dollarRate),
        exportMeterSerialNumber,
        importMeterSerialNumber,
        imageUrl: editProjectData?.imageUrl,
      });
    }
  };

  const [base64ImageData, setBase64ImageData] = useState("");

  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = async (e) => {
  //       const base64Data = e.target.result.split(',')[1]; // Extract base64 portion
  //       setBase64ImageData(e.target.result);

  //       try {
  //         const response = await uploadImage(base64Data);
  //         console.log('Uploaded image data:', response);
  //         // Do something with the uploaded image data, such as displaying it or further processing
  //       } catch (error) {
  //         console.error('Error uploading image:', error);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <>
<div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-700 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-300">
          <div className="flex items-center justify-between bg-gray-700 rounded-t-md px-6 py-3">
            <span className="text-gray-200 font-semibold text-lg">
              Project Update
            </span>
            <button
              className="opacity-80"
              onClick={() => updateProjectModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className="text-gray-200" />
            </button>
          </div>
          <div className="px-6 pb-6 space-y-10">
          <div className="flex flex-col space-y-3">
          <div className="text-gray-800 font-medium text-sm">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Name</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-gray-800 font-medium text-sm">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Funding Type</span>
                  <span className="text-red-500">*</span>
                </div>
                  <select
                className="w-full h-10 border-b-2 border-gray-800 bg-transparent p-2 ring-0 focus:ring-0 focus:outline-none"
                value={fundingType}
                    onChange={(e) => setFundingType(e.target.value)}
                  >
                    <option value="">Select Funding Type</option>
                    <option value="CAPEX">CAPEX</option>
                    <option value="OPEX">OPEX</option>
                  </select>
              </div>
              <div className="text-gray-800 font-medium text-sm">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Tarrif</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="number"
                    placeholder="Enter tarrif"
                    value={tarrif}
                    onChange={(e) => setTarrif(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-gray-800 font-medium text-sm">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Dollar Rate</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="number"
                    placeholder="Enter dollar rate"
                    value={dollarRate}
                    onChange={(e) => setDollarRate(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-gray-800 font-medium text-sm">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Export Meter Serial Number</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter export meter serial number"
                    value={exportMeterSerialNumber}
                    onChange={(e) => setExportMeterSerialNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-gray-800 font-medium text-sm">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Import Meter Serial Number</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter import meter serial number"
                    value={importMeterSerialNumber}
                    onChange={(e) => setImportMeterSerialNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-gray-800 font-medium text-sm space-y-1.5">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Upload Image</span>
                  <span className="text-red-500">*</span>
                </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-gray-800"
              /></div>
              {imageSrc && (
                <Image src={imageSrc} alt="Selected" width={50} height={50} />
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-red-700 text-sm h-8 flex justify-center items-center">
                {errorMessage}
              </div>
              <button
                className="flex h-7 items-center justify-center px-2.5 text-xs text-gray-800 font-semibold bg-gray-200 rounded-md select-none space-x-1 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none"
                onClick={handleCreateProject}
              >  <FontAwesomeIcon icon={faCubesStacked} />
                <span className="">Update Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
