import Image from "next/image";
import "../../index.scss";

function SpecificationCard({
  nameCard: name,
  value,
  imgUrl,
}: SpecificationCardProps): React.ReactNode {
  return (
    <div className="card sm:w-[348px] w-fit h-[106px] rounded-md bg-[#181F2A] overflow-hidden relative flex items-center px-6">
      <div className="flex flex-col items-start justify-center gap-[5px] text-white font-medium">
        <span className="text-[16px]">{name}</span>
        <span className="text-[30px]">{value}</span>
      </div>
      <Image
        src={imgUrl}
        alt=""
        width={448}
        height={106}
        className="absolute sm:w-[64px] sm:h-[64px] w-[32px] h-[32px] sm:right-[20px] sm:top-[20px] right-[30px] top-[53px] rounded-full object-cover"
      />
    </div>
  );
}

export default SpecificationCard;

export interface SpecificationCardProps {
  nameCard: string;
  value: string;
  imgUrl: string;
}