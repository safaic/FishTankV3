'use client';

import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,

} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import {signup } from '@/app/login/actions'

export default function SignUpForm() {
 
const[password, setPassword] = useState('')
const[passwordMatch, setPasswordMatch] = useState(false)
const validatePassword = (confirmValue: string) => {


   let a = (password === confirmValue)
   
   if (password.length === 0 || confirmValue.length === 0) {
      a = false;
    }
    else if (password == confirmValue) {
      a = true; 
    }

   setPasswordMatch(password === confirmValue)
   console.log(a);

   
  //setIsButtonEnabled(a);



  // export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       {/* <button formAction={login}>Log in</button> */}
//       <button formAction={signup}>Sign up</button>
//     </form>
//   )
// }
 }
 
 return (
       <form className="space-y-3"  
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Create Account:
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>


          </div>


          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>

            
          </div>

          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
             Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Confirm password"
                required
                minLength={6} 
                onChange={(e) => validatePassword(e.target.value)}
               
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {!passwordMatch && (
          <p className="mt-2 text-sm text-red-500">
            Passwords do not match
          </p>
        )}
            
          </div>


        </div>

        
       
       
      
            <div className="flex flex-col items-center"> 
<Button 
  className={`mt-4 ${
    passwordMatch 
      ? 'bg-green-500 hover:bg-green-600' 
      : 'bg-gray-300 cursor-not-allowed'
  }`}
  type="submit"
  disabled={!passwordMatch}
  formAction={signup}
  
  // onClick={() => {
  //   window.location.href = '/signup';
  // }}
>
                Create Account 
              </Button>
            </div>
      </div>
    </form>
//   );
// }
  );
}
    
