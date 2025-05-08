//ocelote/src/app/components/navbar.tsx
'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { name: 'Comercial', href: '/pages/projects/comercial' },
  { name: 'Film', href: '/pages/projects/film' },
  { name: 'Photo', href: '/pages/projects/photo' },
  { name: 'Nosotros', href: '/about' },
  { name: 'Contacto', href: '/contact' },
];


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="w-full fixed top-0 z-10 bg-black md:bg-transparent lg:bg-transparent px-4 md:px-8 py-3">
      <div className="mx-auto max-w-10xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo/ocelote-logo-blanco4x.png"
            height={36}
            width={300}
            alt="Ocelote Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm lg:text-lg"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <DisclosureButton className=" hover:text-oceloteRed focus:outline-none">
            <Bars3Icon className="h-6 w-6" />
          </DisclosureButton>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden mt-3 space-y-2">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as={Link}
            href={item.href}
            className="block text-base hover:underline px-2"
          >
            {item.name}
          </DisclosureButton>
        ))}
      </DisclosurePanel>
    </Disclosure>
  )
}
