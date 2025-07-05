import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <header className="container mx-auto">

            <nav className="py-6 px-4 flex items-center  justify-between">
                <Link href="/">
                    <Image src="/logo2.png" alt="logo" width={80} height={50} style={{ cursor: "pointer", borderRadius: "50%" }} />
                </Link>
            

                <div>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </header>
    );
};

export default Header;
