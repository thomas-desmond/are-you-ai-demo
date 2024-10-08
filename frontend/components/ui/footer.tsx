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
        <BehindTheScenesButton />
      </nav>
    </div>
  );
}
