"use client";
import type { HeaderState } from "../states/sideBar"
import { mockHeaderStates } from "../states/sideBar"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import Dashboard from '@/app/icons/Dashboard.svg'
import Log from '@/app/icons/Log.svg'
import Source from '@/app/icons/Source.svg'
import { useState } from "react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const pathName = usePathname();
  const isActive = (menu: HeaderState): boolean => {
    if (menu.slug === "/") {
      return pathName === "/"
    }
    return pathName.startsWith(menu.slug)
  }
  return (
    <aside className="bg-[#253444] w-64 flex-1 min-h-screen flex flex-col gap-4 text-white fixed inset-y-0 left-0">
      <div className="w-full text-[30px] text-white font-bold mb-4 flex items-center justify-center gap-2">
        <Avatar>
          <AvatarImage src={'/logo.avif'}/>
        </Avatar>
        Admin
      </div>
      <span className="text-white ml-2">Navigation</span>
      {mockHeaderStates.map((menu) => (
        <SingleMenu key={menu.id} menu={menu} isActive={isActive(menu)}/>
      ))}
    </aside>
  )
}

const Icon: Record<string, React.ReactNode> = {
  Dashboard: <Dashboard className="w-4 h-4" />,
  Logs: <Log className="w-4 h-4" />,
  Sources: <Source className="w-4 h-4" />,
}


export const SingleMenu = ({menu, isActive}: {menu: HeaderState, isActive: boolean}) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!menu.children?.length) {
    return (
      <Link 
        href={menu.slug}
        className={cn("w-full px-[20px] py-[10px] flex gap-2 items-center", isActive && "bg-[#1B232E]")}
        onClick={() => setIsOpen(true)}
      >
        {Icon[menu.name]}
        {menu.name}
      </Link>
    )
  }
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <CollapsibleTrigger className="w-full">
      <div className={cn("flex justify-between text-white items-center w-full px-[20px] py-[10px]", isActive ? "bg-[#1B232E]" : "bg-none")}>
        <Link href={menu.slug} className="flex items-center justify-center gap-2">
          {Icon[menu.name]}
          {menu.name}
        </Link>
        {isOpen ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
      </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-[10px] px-[20px]">
        {menu.children?.map((child) => (
          <div key={child.id} className="flex items-center justify-start">
            <ChevronRight className="w-4 h-4 inline-block mr-2"/>
            {child.name}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}