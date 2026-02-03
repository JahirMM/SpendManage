"use client";

import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { Loader2, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  user: User | null;
  isLoading: boolean;
}

function Header({ user, isLoading }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header className="relative z-50 flex items-center justify-between max-w-5xl px-4 py-3 mx-auto text-white bg-primary xl:max-w-7xl xl:px-0">
        <span className="text-sm">SpendManage</span>
        <nav className="hidden md:block">
          <ul className="flex gap-5 text-sm">
            <li>
              <a href="" className="hover:text-action hover:font-bold">
                Características
              </a>
            </li>
            <li>
              <a href="" className="hover:text-action hover:font-bold">
                Cómo funciona
              </a>
            </li>
            <li>
              <a href="" className="hover:text-action hover:font-bold">
                Beneficios
              </a>
            </li>
          </ul>
        </nav>
        <div className="hidden space-x-5 text-sm md:block">
          {isLoading ? (
            <Button type="button" size="sm">
              <Loader2 className="size-[18px]" />
            </Button>
          ) : user ? (
            <Link href={"/dashboard"}>
              <Button type="button" size="sm">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link
                href={"/login"}
                className="hover:text-action hover:font-bold"
              >
                Iniciar sesión
              </Link>
              <Link href={"/signup"}>
                <Button type="button" size="sm">
                  Registrarse
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          {showMenu ? (
            <Button variant="ghost" onClick={toggleMenu} type="button">
              <X className="size-[18px]" />
            </Button>
          ) : (
            <Button variant="ghost" onClick={toggleMenu} type="button">
              <Menu className="size-[18px]" />
            </Button>
          )}
        </div>
      </header>
      <div
        className={`absolute shadow z-40 top-11 px-4 py-5 w-full bg-primary md:hidden transition-transform duration-300 ease-in-out ${
          showMenu ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        <nav className="text-white">
          <ul className="flex flex-col gap-5 text-sm">
            <li>
              <a href="" className="hover:text-action hover:font-bold">
                Características
              </a>
            </li>
            <li>
              <a href="" className="hover:text-action hover:font-bold">
                Cómo funciona
              </a>
            </li>
            <li>
              <a href="" className="hover:text-action hover:font-bold">
                Beneficios
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-5 space-x-8 text-sm">
          <a href="" className="text-white hover:text-action hover:font-bold">
            Iniciar sesión
          </a>
          <Button type="button" size="sm">
            <a href="">Registrarse</a>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Header;
