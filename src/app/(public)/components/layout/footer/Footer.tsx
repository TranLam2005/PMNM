import Image from "next/image";
import React from "react";
import Instagram from "@/app/icons/Instagram.svg";
import Facebook from "@/app/icons/Facebook.svg";
import LinkedIn from "@/app/icons/LinkedIn.svg";
import Discord from "@/app/icons/Discord.svg";
import Place from "@/app/icons/Place.svg";
import Mail from "@/app/icons/Mail.svg";
import Phone from "@/app/icons/Phone.svg";
import GooglePlay from "@/app/icons/GooglePlay.svg";
import Apple from "@/app/icons/Apple.svg";
import { Separator } from "@/components/ui/separator";
import { DownloadApp } from "./BDowload";
import { mockMenuItems } from "@/app/(public)/states/mocks";
import { RenderMenu } from "./RenderMenu";

function Footer(): React.ReactNode {

  return (
    <footer className="bg-[#011E44] w-full h-[443px] flex items-center justify-center">
      <div className="max-w-[1200px] h-full flex flex-col items-center">
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex flex-col items-start justify-center gap-[20px]">
            <Image
              src={"/logo.avif"}
              alt="logo"
              width={160}
              height={40}
              className="w-[70px] h-[36px] rounded-full"
            />
            <div className="flex items-center gap-[20px] text-white">
              <Instagram className="w-[24px] h-[24px]"/>
              <Facebook className="w-[24px] h-[24px]"/>
              <LinkedIn className="w-[24px] h-[24px]"/>
              <Discord className="w-[24px] h-[24px]"/>
            </div>
            <InfoComponent
              icon={<Place className="text-white w-[30px] h-[30px]" />}
              text="No. 2 Nguyen Hoang, Tu Liem Ward, Nam Tu Liem District, Hanoi"
            />
            <InfoComponent
              icon={<Mail className="text-white w-[30px] h-[30px]" />}
              text="info@example.com"
            />
            <InfoComponent
              icon={<Phone className="text-white w-[30px] h-[30px]" />}
              text="(+1) 123456789"
            />
          </div>
          <div className="flex items-start flex-col">
            <div className="flex items-start gap-[70px]">
              {mockMenuItems.map((menu) => (
                <RenderMenu key={menu.id} menu={menu} />
              ))}
            </div>
            <div className="flex flex-col items-start justify-center gap-[10px] relative left-[436px]">
              <span className="text-white font-semibold">Download our app</span>
              <DownloadApp
                icon={<GooglePlay className="text-white w-[30px] h-[30px]" />}
                nameForDownLoad="Google Play"
              />
              <DownloadApp
                icon={<Apple className="text-white w-[30px] h-[30px]" />}
                nameForDownLoad="App Store"
              />
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" className="bg-white" />
        <span className="text-white mb-[25px] mt-[10px]">Copyright © 2010-2025</span>
      </div>
    </footer>
  );
}

const InfoComponent: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-white">{text}</p>
    </div>
  );
};



export default Footer;
