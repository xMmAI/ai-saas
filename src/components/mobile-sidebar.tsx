"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
    Sheet, 
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-[#111827]">
                <Sidebar />
            </SheetContent>
        </Sheet>
    ); 
}

export default MobileSidebar;