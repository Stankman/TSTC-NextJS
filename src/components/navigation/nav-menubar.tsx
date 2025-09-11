
import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";

function NavMenubar() {
    return (
    <NavigationMenu className="hidden lg:flex" viewport={false}>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="/">Home</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuTrigger>Programs & Degrees</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul>
                        <li>
                            <NavigationMenuLink asChild>
                                <Link href="/programs">Browse All Programs</Link>
                            </NavigationMenuLink>
                        </li>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);
}

export { NavMenubar };