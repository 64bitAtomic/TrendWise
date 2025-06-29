// export default function Footer() {
//   return (
//     <footer className="mt-16 border-t border-gray-700 py-6 text-center text-sm text-gray-400">
//       <p>
//         © {new Date().getFullYear()} TrendWise. Built with ❤️ using Next.js & Gemini.
//       </p>
//     </footer>
//   );
// }

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-700 py-6 text-center text-sm text-gray-400">
      <p className="mb-3">
        © {new Date().getFullYear()} TrendWise. Built with ❤️ using Next.js & Gemini.
      </p>

      <div className="flex justify-center gap-6 text-lg text-gray-500">
        <a
          href="https://github.com/64bitAtomic"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/mohammad-zaid-khan-020199260/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/mzaidkhan2004"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://innospark.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          <FaGlobe />
        </a>
      </div>
    </footer>
  );
}
