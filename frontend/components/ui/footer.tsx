import Link from "next/link";
import BehindTheScenesButton from "../behindTheScenes/behindTheScenesButton";

export default function Footer() {
  return (
    <div className="bg-gray-300 text-black py-2 w-full px-5 sticky bottom-0">
          <nav className="flex flex-row justify-between items-center">
            <Link href="https://www.cloudflare.com/website-terms/" className="">
              Privacy Policy
            </Link>
            <BehindTheScenesButton />
          </nav>
    </div>
  );
}
