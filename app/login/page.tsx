// import AcmeLogo from '/app/ui/acme-logo';
import LoginForm from "@/app/ui/login-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg  p-3 md:h-36">
          <div className="w-32 text-white md:w-36">{/* <AcmeLogo /> */}</div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}

// import { login, signup } from '@/app/login/actions'

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
