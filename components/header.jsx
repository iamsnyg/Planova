import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { NotebookPen } from "lucide-react";
import UserMenu from "./user-menu";
import { checkUser } from "@/lib/clerkUser";

const Header = async () => {
    await checkUser();
    return (
        <header className="container mx-auto">

            <nav className="py-6 px-4 flex items-center  justify-between">
                <Link href="/">
                    <Image src="/logo2.png" alt="logo" width={80} height={50} style={{ cursor: "pointer", borderRadius: "50%" }} />
                </Link>
            

                <div className="flex flex-row items-center ">
                    <Link href="/project/create">
                        <Button variant="planovaBtn" className="mr-4">
                            <NotebookPen className="mr-2" size={16} />
                            <span>Create Project</span>
                        </Button>
                    </Link>

                    <SignedOut>
                        <SignInButton forceRedirectUrl="/">
                            <Button variant="outline">Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserMenu/>
                    </SignedIn>
                    
                </div>
            </nav>
        </header>
    );
};

export default Header;
