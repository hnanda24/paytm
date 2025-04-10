import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4">
      <div className="container mx-auto text-center flex flex-col items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} PayWallet. All rights reserved.
        </p>
        <p className="text-sm">
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
