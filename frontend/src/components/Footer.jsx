import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logodcarlos} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            The best site to get what you need to dress for any occasion. We love to make you look good and wear our products. Making sure your order arrives in excellent condition. Thank you for choosing us..
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+593-990-694-346</li>
                <li>dagocapurrovera@gmail.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ Diego Capurro - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
