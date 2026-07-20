import React from "react";
import brandBannerImg from "./brand_banner.jpg";

export const BrandBanner: React.FC = () => {
  return (
    <div className="flex items-center shrink-0 select-none">
      <img
        src={brandBannerImg}
        alt="英杰妈制作"
        className="h-10 sm:h-12 md:h-[50px] w-auto rounded-lg shadow-md border border-slate-800/80 object-contain hover:scale-102 transition-transform duration-200"
      />
    </div>
  );
};
