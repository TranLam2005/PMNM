export const DownloadApp: React.FC<{ icon: React.ReactNode; nameForDownLoad: string }> = ({
  icon,
  nameForDownLoad,
}) => {
  return (
    <div className="border rounded-md border-white w-[147px] flex items-center justify-start gap-[10px] py-1 px-2 cursor-pointer">
      {icon}
      <span className="text-white">
        <p className="text-[14px]">Get it on</p>
        <p className="text-[16px] font-semibold">{nameForDownLoad}</p>
      </span>
    </div>
  );
};