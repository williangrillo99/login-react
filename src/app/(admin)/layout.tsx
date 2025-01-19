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
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="w-full p-6">
            <div className="mb-4">
              <SidebarTrigger>
                <ChevronLeft className="h-4 w-4" />
              </SidebarTrigger>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}