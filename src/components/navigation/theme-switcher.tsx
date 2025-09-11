"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            className="relative"
            size="icon"
            onClick={ () => setTheme(theme === "light" ? "dark" : "light") }
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
        </Button>
    );
}

export { ThemeSwitcher };