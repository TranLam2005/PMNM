export const Circle: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return (
    <div className="w-[108px] h-[108px] rounded-full border-[4px] border-[#568ACC] p-[8px] bg-white">
      <div className="w-full h-full rounded-full bg-[#568ACC] flex items-center justify-center text-white font-bold">
        {icon}
      </div>
    </div>
  );
};