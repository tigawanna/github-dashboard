import { MainDrawer } from '@/components/navigation/drawer/MainDrawer'
import { MainDrawerFooter } from '@/components/navigation/drawer/MainDrawerFooter'
import { MainDrawerLinks } from '@/components/navigation/drawer/MainDrawerLinks'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MainDrawer links={<MainDrawerLinks />} footer={<MainDrawerFooter />}>
      <div className="min-h-screen flex flex-col items-center gap-3">
        <div className="min-h-[70vh] w-full flex flex-col items-center gap-3 justify-center">
          <h3 className="text-5xl font-bold">Welcome To Profile Page</h3>
        </div>
      </div>
    </MainDrawer>
  );
}
