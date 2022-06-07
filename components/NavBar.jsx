import Image from 'next/image'
import { GiGamepadCross } from 'react-icons/gi'
import { getPageCategories } from '../services'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import React, { useState, useEffect, Fragment } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: 'https://dynamico-gaming.netlify.app/', current: true },
  {
    name: 'Categories',
    href: 'https://dynamico-gaming.netlify.app/category/gamingnews',
    current: true,
  },
]

const NavBar = () => {
  const [categories, setCategories] = useState([])
  const { data: session, status } = useSession()
  useEffect(() => {
    getPageCategories().then((newCategories) => setCategories(newCategories))
  }, [])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure
      as="nav"
      className="from easein from border-1 border border-amber-400  bg-gradient-to-r from-black to-transparent transition duration-500  hover:bg-gradient-to-l hover:transition hover:ease-in"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className=" relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-amber-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link passHref href="/" className="flex items-center">
                    <GiGamepadCross
                      color="orange"
                      fontSize="2.5em"
                      className="flex animate-spin items-center justify-center hover:transform"
                    />
                  </Link>
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {categories.map((category) => (
                    <a
                      href={`/category/${category.slug}`}
                      key={category.slug}
                      className={classNames(
                        category.current
                          ? 'bg-amber-900 text-white'
                          : 'text-gray-300 hover:bg-amber-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <>
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-amber-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-800">
                        <span className="sr-only">Open user menu</span>
                        <image
                          className="h-8 w-8 rounded-full"
                          src={session?.user?.image}
                          alt="👤"
                          height={8}
                          width={8}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="sm:w-15 lg:w-25 absolute right-0 mt-2 origin-top-right rounded-md bg-gray-500 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-48">
                        <Menu.Item>
                          {session ? (
                            <div className="col-span-10 grid justify-center md:justify-center ">
                              <Image
                                src={session?.user?.image}
                                className=" h-7 w-7 justify-center  rounded-full sm:w-auto"
                                alt="user-img"
                              />
                              <h5 className="md:text-md font-semibold text-black sm:text-xs lg:text-lg ">
                                Signed in as {session?.user?.name}
                              </h5>
                              <h6 className="md:text-md lg:text-md  text-black sm:text-xs ">
                                Signed in as {session?.user?.email}
                              </h6>
                              <button
                                onClick={signOut}
                                className="hover:easein float-right inline-block transform cursor-pointer rounded-full  bg-amber-300   from-emerald-500 via-emerald-600 to-emerald-700 px-1 py-1 text-lg font-medium text-black duration-300 ease-out hover:-translate-y-1 hover:bg-gradient-to-l hover:text-white hover:duration-300"
                              >
                                Sign out
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={signIn}
                                className="hover:easein float-right inline-block transform cursor-pointer rounded-full  bg-amber-300   from-emerald-500 via-emerald-600 to-emerald-700 px-3 py-2 text-lg font-medium text-black duration-300 ease-out hover:-translate-y-1 hover:bg-gradient-to-l hover:text-white hover:duration-300"
                              >
                                Sign in
                              </button>
                            </>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-amber-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default NavBar
