import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <main className="flex-1 relative">
          <div className="absolute inset-0">
            <div className="h-full flex flex-col">
              <div className="p-4">
                <SidebarTrigger>
                  <ChevronLeft className="h-4 w-4" />
                </SidebarTrigger>
              </div>
              <div className="flex-1 px-4 pb-4">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}