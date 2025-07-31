import { useState } from "react";
import IDModal from "./Modal";

const GetIDButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [idStep, setIdStep] = useState<"input" | "loading" | "success">(
  //   "input"
  // );

  const handleClick = () => {
    setIsModalOpen(true);
    // setIdStep("input");
  };

  return (
    <>
      <button
        onClick={handleClick}
        // className="w-full bg-[var(--level-5)] text-white font-semibold rounded-md py-3 px-4 flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors"
        className="flex items-center justify-center gap-2 p-2 bg-[var(--id-card-accent)] text-black font-bold py-2 rounded-md hover:bg-opacity-90 transition-colors mt-2"
      >
        <span className="material-symbols-outlined">badge</span>
        Get zkId
      </button>

      {/* Modal UI — optional */}
      {isModalOpen && (
        // <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
        //   <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-xl p-6 w-full max-w-md">
        //     <h3 className="text-lg font-semibold text-text-primary mb-4">
        //       zkID Modal
        //     </h3>
        //     {idStep === "input" && (
        //       <div className="space-y-4">
        //         <p className="text-sm text-text-secondary">
        //           Enter your zkID input.
        //         </p>
        //         <button
        //           className="w-full bg-[var(--level-5)] text-white py-2 rounded hover:bg-opacity-90"
        //           onClick={() => setIdStep("loading")}
        //         >
        //           Submit
        //         </button>
        //       </div>
        //     )}

        //     {idStep === "loading" && (
        //       <p className="text-sm text-text-secondary">Verifying zkID...</p>
        //     )}

        //     {idStep === "success" && (
        //       <p className="text-green-500 font-medium">zkID Verified ✅</p>
        //     )}

        //     <button
        //       className="absolute top-2 right-2 text-gray-400 hover:text-white"
        //       onClick={() => setIsModalOpen(false)}
        //     >
        //       ×
        //     </button>
        //   </div>
        // </div>
        <IDModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default GetIDButton;
