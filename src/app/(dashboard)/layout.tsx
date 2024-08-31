import NavBar from "./_components/navbar";
import SideBar from "./_components/sidebar";
import OrgSideBar from "./_components/sidebar/org-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <SideBar />
      <div className="h-full pl-[65px]">
        <div className="flex h-full">
          <OrgSideBar />
          <div className="h-full flex-1">
            <NavBar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
