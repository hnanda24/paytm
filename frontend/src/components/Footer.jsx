import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center flex flex-col items-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PayWallet. All rights reserved.
        </p>
        <p className="text-sm text-gray-300">
          Built with ❤️ by{" "}
          <span className="font-bold hover:text-gray-100 transition">
            Hardik
          </span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
