//Completed: Yes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCubesStacked } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postProject } from "@/lib/Helper";

export default function AddUserModal({
  createProjectModalOpen,
  projectCreated,
}) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [solarmanPlantId, setSolarmanPlantId] = useState("");
  const [fundingType, setFundingType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation(postProject, {
    onSuccess: () => {
      projectCreated(true);
      createProjectModalOpen(false);
      queryClient.invalidateQueries("projects");
    },
    onError: (error) => {
      if (
        error.response.data.message ===
        "Solarman plant not found, please provide proper plant ID"
      ) {
        setErrorMessage("Please provide proper Plant ID.");
      } else if (
        error.response.data.message === "\nInvalid `this.prisma.project.create()` invocation in\n/root/monitoring_portal/solaric-monitoring-dashboard-backend/dist/project/project.service.js:39:59\n\n  36 console.log('Found matching project:', matchedSolarmanPlant);\n  37 const deviceList = await this.solarman.getAllDevices(matchedSolarmanPlant.id);\n  38 console.log({ deviceList });\n→ 39 const project = await this.prisma.project.create(\nUnique constraint failed on the fields: (`solarmanPlantId`)"
      ) {
        setErrorMessage("Project already exists.");
      }
      else {
        setErrorMessage("Something went wrong.");
      }
    },
  });

  const handleCreateProject = (e) => {
    projectCreated(false);
    setErrorMessage("");
    if (!name || !solarmanPlantId || !fundingType) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    mutation.mutate({
      name,
      solarmanPlantId: parseInt(solarmanPlantId),
      fundingType,
    });
  };

  return (
    <>
          <div className="flex items-center bg-opacity-10 backdrop-filter backdrop-blur-sm bg-gray-700 fixed inset-0 z-50">
        <div className="grid grid-cols-1 bg-gray-50 rounded-md items-center relative mx-auto w-[20rem] sm:w-[24rem] space-y-5 shadow-md border border-gray-300">
          <div className="flex items-center justify-between bg-gray-700 rounded-t-md px-6 py-3">
            <span className="text-gray-200 font-semibold text-lg">
            Add New Project
            </span>
            <button
              className="opacity-80"
              onClick={() => createProjectModalOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className="text-gray-200" />
            </button>
          </div>
          <div className="px-6 pb-6 space-y-10">
          <div className="flex flex-col space-y-3">
          <div className="text-gray-800 font-medium text-sm space-x-1">
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
              <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Solarman Plant Id</span>
                  <span className="text-red-500">*</span>
                </div>
                <div className="flex items-center border-b-2 border-gray-800">
                <input
                    className="w-full h-10 px-2 text-md text-gray-800 placeholder-[#727272] bg-transparent ring-0 focus:ring-0 focus:outline-none"
                    type="text"
                    placeholder="Enter Solarman Plant Id"
                    value={solarmanPlantId}
                    onChange={(e) => setSolarmanPlantId(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-gray-800 font-medium text-sm space-x-1">
                <div className="font-medium text-base text-gray-800 space-x-0.5">
                  <span>Funding Type</span>
                  <span className="text-red-500">*</span>
                  </div>
                  <select
                className="w-full h-10 border-b-2 border-gray-800 bg-transparent p-2 ring-0 focus:ring-0 focus:outline-none"
                value={fundingType}
                    onChange={(e) => setFundingType(e.target.value)}
                  >
                    <option disabled>Select Funding Type</option>
                    <option value="CAPEX">CAPEX</option>
                    <option value="OPEX">OPEX</option>
                  </select>
                  </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-red-700 text-sm h-8 flex justify-center items-center">
                {errorMessage}
              </div>
              <button
                className="flex h-7 items-center justify-center px-2.5 text-xs text-gray-800 font-semibold bg-gray-200 rounded-md select-none space-x-1"
                onClick={handleCreateProject}
              >
                                <FontAwesomeIcon icon={faCubesStacked} />                <span className="">Add Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
