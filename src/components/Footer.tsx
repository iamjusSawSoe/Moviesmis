import { socialMedia } from "@/utils/constant";
import Image from "next/image";

const Footer = () => (
  <footer className={`flex items-center justify-center px-10 py-10 flex-col`}>
    {/* <div
      className={`flex justify-start items-center md:flex-row flex-col mb-8 w-full pr-0 md:pr-[250px] pl-0 md:pl-20`}
    >
      <div className="flex-1 flex flex-col justify-start items-center mr-10">
        <img
          src={logoFooter}
          alt="hoobank"
          className=" object-contain rounded-full"
        />
        <p
          className={` text-center font-poppins font-normal text-whiteColor text-[18px] leading-[30.8px] mt-4 max-w-[310px]`}
        >
          Brings You The Great Movies...... Also Series!
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10 ">
        {footerLinks.map((footerLink, index) => (
          <div key={index} className="flex flex-col ss:my-0 my-4 min-w-[150px]">
            <h4 className="font-poppins text-whiteColor font-medium text-[18px] leading-[27px]">
              {footerLink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerLink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary cursor-pointer ${
                    index !== footerLink.links.length - 1 ? "mb-4" : "mb-0"
                  }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div> */}

    <div className="w-full flex px-0 md:px-[200px] justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#2e2e32]">
      <p className="font-poppins text-whiteColor font-normal text-[18px] leading-[27px]">
        2022 Moviemis. All Rights Reserved.
      </p>
      <p className="font-poppins text-secondary font-normal text-[16px] leading-[27px] my-8 md:my-0">
        Created & Developed by Saw Soe Htut Win
      </p>
      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <Image
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer mr-10`}
          />
        ))}
      </div>
    </div>
  </footer>

  // <section className=' bg-gray-900 text-secondary flex justify-center items-center flex-col py-8'>
  //     <div className=' flex-1 flex md:flex-row flex-col justify-center items-start'>
  //         <img src={logoFooter} alt='logo' className=' object-contain rounded-full ' />
  //         <h1 className=' text-center font-poppins font-bold text-secondary text-[20px] mt-4 leading-[30.8px] max-w-[310px]'>Moviemis Brings You Great <br /> Movies...... Also Series!</h1>
  //     </div>
  //     <div className='flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10'>
  //         {footerLinks.map((footerLink)=> (
  //             <div key={footerLink.id} className="">
  //                 <h1 className='font-poppins text-secondary font-medium text-[18px] leading-[27px]'>{footerLink.title}</h1>

  //             </div>
  //         ))}
  //     </div>
  // </section>
);

export default Footer;
