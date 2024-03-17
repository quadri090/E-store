import Container from "../Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";

const redressed = Redressed({ subsets: ['latin'], weight: ['400']})

const NavBar = () => {
  return (
    <div className="sticky z-10 py-4 top-0 w-full bg-slate-200">
      <div className="border-b-[1px]"></div>
      <Container>
        <nav className="flex justify-between items-center gap-3 md-gap-0">
          <Link href="/" className={`${redressed.className} text-2xl font-bold `}>Shoppy</Link>
          <div>Search</div>
          <div className="flex gap-8 md:gap-12 items-center">
            <CartCount />
            <div>UserMenu</div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default NavBar;
