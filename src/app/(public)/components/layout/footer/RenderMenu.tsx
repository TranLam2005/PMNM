import { MenuItem } from "@/app/(public)/states/types";

export const RenderMenu: React.FC<{ menu: MenuItem }> = ({ menu }) => {
  return (
    <div className="flex flex-col items-start justify-center gap-[5px] min-w-fit">
      <span className="font-semibold text-white">{menu.name}</span>
      <div className="flex flex-col justify-center text-start">
        {menu.children?.map((child) => (
          <span className="text-[#F2F2F2] text-[13px]" key={child.id}>
            {child.name}
          </span>
        ))}
      </div>
    </div>
  );
};