import Image from "next/image";
import React from "react";

export interface Actor {
  nameActor: string;
  avatarUrl: string;
}

export interface ActorCellProps {
  value: Actor;
}

export const ActorCell: React.FC<ActorCellProps> = ({ value }) => {
  return (
    <div className="flex items-center justify-center gap-[10px]">
      <Image
        src={value.avatarUrl}
        alt="Avatar"
        width={40}
        height={40}
        className="w-[24px] h-[24px]"
      />
      <span className="">{value.nameActor}</span>
    </div>
  );
};
