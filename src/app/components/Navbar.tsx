"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "../utils/cn";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Home">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">Home</HoveredLink>
            </div>
          </MenuItem>
          <HoveredLink href="/home">Service</HoveredLink>
          <MenuItem setActive={setActive} active={active} item="Courses"></MenuItem>
          {/* <MenuItem setActive={setActive} active={active} item="Pricing">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">Hobby</HoveredLink>
              <HoveredLink href="/individual">Individual</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem> */} 
        </Menu>
      </div>
    </>
  )
}