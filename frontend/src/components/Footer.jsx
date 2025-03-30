import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-199">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} PayWallet. All rights reserved.
        </p>
        <p className="text-sm">
          Built with ❤️ by <span className="font-bold">Hardik and shifted with authority by Shorya</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
