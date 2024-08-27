export default function ReloadPage() {
  return (
    <div className="w-full min-h-screen  bg-slate-900 text-white">
      <div className="flex flex-wrap justify-around">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 p-2 relative animate-pulse"
          >
            <div className="cursor-pointer p-4 rounded-xl bg-white bg-opacity-[0.05] backdrop-blur-[5px] border border-white border-opacity-[0.18]">
              <div className="h-48 bg-gray-400 rounded-xl"></div>
              <div className="truncate font-semibold my-2 text-lg bg-gray-400 rounded-xl h-6"></div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-400 rounded-lg"></div>
                  <div className="ml-2">
                    <div className="flex items-center">
                      <div className="bg-gray-400 rounded-xl h-4 w-20"></div>
                    </div>
                    <div className="text-sm font-light bg-gray-400 rounded-xl h-4 w-24 mt-1"></div>
                  </div>
                </div>
                <div className="bg-gray-400 rounded-xl w-20 h-8"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
