import React from "react";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

interface HeadingProps {
  desc: string | null;
}

function Heading({ desc }: HeadingProps) {
  return <h3 className="font-bold text-base mb-2">{desc}</h3>;
}

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-smmt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <Heading desc="Shop Categories" />
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktop</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="font-bold text-base mb-2">Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">Watches</Link>
            <Link href="#">FAQs</Link>
            <Link href="#">Jamal</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="font-bold text-base mb-2">About Us</h3>
            <p className="mb-2">
              at our electronics store, we arre dedicated to providing the
              latest devices and accessories tpo our customers. With a wide
              selection of phones, TVs, laptops, watches, and accessories.
            </p>
            <p>&copy; {new Date().getFullYear()} Shoppy. All rights reserved</p>
          </div>
          <FooterList>
            <h3 className="font-bold text-base mb-2">Follow Us</h3>
            <div className="flex gap-2">
            <Link href="#"><MdFacebook size={24}/></Link>
            <Link href="#"><AiFillTwitterCircle size={24}/></Link>
            <Link href="#"><AiFillInstagram size={24}/></Link>
            <Link href="#"><AiFillYoutube size={24}/></Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
