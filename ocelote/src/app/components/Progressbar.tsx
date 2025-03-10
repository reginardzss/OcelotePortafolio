import React from "react";

type Props = {
  progress: number;
};

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-700 rounded-full h-4">
      <div
        className="bg-green-500 h-4 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
