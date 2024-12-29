import { Header } from "./_components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />

      <div className="pt-10 px-10 md:px-20 lg:px-40 xl:px-60">
        {children}
      </div>
    </div>
  )
}