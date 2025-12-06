"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header className="relative z-50 flex items-center justify-between max-w-5xl px-4 py-3 mx-auto text-black bg-background-page xl:max-w-7xl xl:px-0">
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
          <a href="" className="hover:text-action hover:font-bold">Iniciar sesión</a>
          <Button type="button" size="sm">
            <a href="">Registrarse</a>
          </Button>
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
        className={`absolute shadow z-10 top-11 px-4 py-5 w-full bg-white md:hidden transition-transform duration-300 ease-in-out ${
          showMenu ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        <nav>
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
          <a href="" className="hover:text-action hover:font-bold">Iniciar sesión</a>
          <Button type="button" size="sm">
            <a href="">Registrarse</a>
          </Button>
        </div>
      </div>
    </>
  );
}

export default Header;
