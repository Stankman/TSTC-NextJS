"use client";

import Image from "next/image";
import { NavMenubar } from "../navigation/nav-menubar";
import { ThemeSwitcher } from "../navigation/theme-switcher";
import Link from "next/link";
import { Container } from "./craft";

export default function Header() {
    return (
        <header className="bg-primary text-primary-foreground py-4">
            <Container>
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Image
                            className="w-30 md:w-32 lg:w-40"
                            src="/tstc-logo.svg"
                            alt="TSTC Logo"
                            width={144}
                            height={66}
                            priority
                        />
                    </Link>
                    <div className="flex items-center gap-4">
                        <NavMenubar />
                        <ThemeSwitcher />
                    </div>
                </div>
            </Container>
        </header>
    );
}