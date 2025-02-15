import SideNav from "@/app/ui/dashboard/sidenav";
export const experimental_ppr = true;

function getDeviceType() {
  const userAgent = navigator.userAgent;
  if (/Mobile|Android|iPhone|iPad/i.test(userAgent)) {
    return "mobile";
  } else {
    return "desktop";
  }
}

const deviceType = getDeviceType();
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden dark:bg-[#090aA0B] rounded-lg px-6 py-8 ring shadow-xl ">
      <div className="w-full flex-none md:w-64 dark:bg-[#121212] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] dark:border-gray-800/30 rounded-lg">
        <SideNav />
      </div>
      <div
        className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-900 text-gray-100 dark:bg-[#121212] rounded-2xl  "
        style={
          deviceType === "mobile"
            ? { width: "100%", padding: "0", margin: "0", position: "relative"  }
            : { width: "auto" }
        }
      >
        {children}
      </div>
    </div>
  );
}
