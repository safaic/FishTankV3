'use client'
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Image from 'next/image';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { signOutAction } from '@/app/lib/actions';

export default function SideNav() {

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2" >
  <Link
    className="mb-2 flex h-20 items-center justify-center rounded-md p-4 md:h-40  dark:bg-[#222222]"
    href="/"
  >
    <div className="flex items-center justify-center w-32 md:w-40">
      {/* <HomeIcon sx={{ fontSize: 60, color: '#FFFFFF' }} /> */}

      <Image
            src="/FishHomeIconApp.webp"
            alt="Logo"
            width={60}
            height={60}
            priority
          />
    </div>
  </Link>

      
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 ">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form action={signOutAction}>
          
          <button     className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 ">
            <PowerSettingsNewIcon sx={{ fontSize: 30, color: '#FFFFFF' }}/>
            <div className="hidden md:block text-white">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
