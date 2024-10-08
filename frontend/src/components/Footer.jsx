import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-blue-500 py-6">
      <div className="container mx-auto">
        <div className="text-center">
          <p className="text-sm text-black">
            &copy; {new Date().getFullYear()} My Web. All rights reserved.
          </p>
          <p className="text-sm text-black mt-2">
            Made with ❤️ by Ashu Arora
          </p>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://github.com/AyushiVashisth"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-5 h-5 text-black" />
          </a>
          <a
            href="https://www.linkedin.com/in/ashu130arora056/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-5 h-5 text-black" />
          </a>
          <a
            href="mailto:"ashu130arora@gmail.com"
            rel="noreferrer"
            target="_blank"
          >
            <MdEmail className="w-5 h-5 text-black" />
          </a>
        </div>
        <p className="text-sm text-black mt-4 text-center">
          Check out my{" "}
          <a
            className="text-black font-bold"
            href="https:""
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>{" "}
          and{" "}
          <a
            className="text-black font-bold"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            portfolio
          </a>{" "}
          to know more about me. I'm open to new opportunities and excited to
          work with you!
        </p>
      </div>
    </div>
  );
};

export default Footer;
