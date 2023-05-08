export default function User() {
  return (
    <>
      <div className="w-full rounded-md">
        <div className="space-y-1 pb-1">
          <div className="flex items-center justify-between bg-white rounded-md p-3">
            <div className="flex items-center space-x-3 select-none">
              <h1 className="text-[#373737] font-semibold text-xl">
                User Management
              </h1>
              <p className="text-[#373737] text-sm bg-gray-200 p-1 rounded-md">
                {/* {data?.length} {data?.length < 2 ? "user" : "users"} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
