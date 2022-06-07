// pages/404.js
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import IMGA from '../img/ERROR404.gif'

export default function Custom404() {
  return (
    <div>
      <div>
        <Link
          href="/"
          className="bg-orange-400 text-center text-lg font-extrabold text-emerald-50 shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
      <div>
        <h2 className="bg-orange-400 text-center text-lg font-extrabold text-emerald-50 shadow-lg">
          <em>404 - Page Not Found</em>
        </h2>
      </div>
      <div>
        <Image src={IMGA} alt="Error 404 Please Return to the Main Page" width={1920} height={1080} />
      </div>
    </div>
  )
};
