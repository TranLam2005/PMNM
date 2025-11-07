import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Bell, Menu, MessageCircle, Search } from "lucide-react";
import SearchReveal from "./SearchReveal";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="sticky w-full top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-[120rem] items-center gap-4 px-6 py-3">
        <Button variant={'outline'} className="rounded-xl border border-slate-200 p-2 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <Link href={'/'} className="flex items-center gap-2">
          <Image 
            src={'/logo-v2.webp'}
            alt="Logo"
            width={30}
            height={30}
            className="h-8 w-8 object-contain rounded-full"
          />
          <span className="font-semibold tracking-tight">Beginners</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <SearchReveal />
          <Button variant={'outline'} className="rounded-xl border border-slate-200 p-2"><Bell className="h-5 w-5" /></Button>
          <Button variant={'outline'} className="rounded-xl border border-slate-200 p-2"><MessageCircle className="h-5 w-5" /></Button>
          <div className="ml-2 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1">
            <Avatar>
              <AvatarImage src={'/logo.avif'}/>
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium text-slate-700 md:block">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;