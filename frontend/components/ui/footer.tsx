import Link from "next/link";
import BehindTheScenesButton from "../behindTheScenes/behindTheScenesButton";

export default function Footer() {
  return (
    <div className="bg-gray-300 text-black py-1 w-full px-5 sticky bottom-0">
      <nav className="flex flex-row justify-between items-center">
        <div>
          <Link href="https://www.cloudflare.com/website-terms/" className="text-sm">
            Terms of Use
          </Link>
          {" | "}
          <Link href="https://www.cloudflare.com/privacypolicy/" className="text-sm">
            Privacy Policy
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="https://forms.gle/UbUv9TB7Q2b4HEPLA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition-colors duration-200 border border-gray-500 hover:border-gray-400"
          >
            Provide Feedback
          </Link>
          <BehindTheScenesButton />
        </div>
      </nav>
    </div>
  );
}
