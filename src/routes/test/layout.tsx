import { LayoutProps, Link } from "rakkasjs"
export default function Layout({children}: LayoutProps) {
return (
<div className="w-full h-full  ">
    <div className="w-full flex gap-3 ">
        <Link href="/test">test</Link>
        <Link href="/test/auth">auth</Link>
    </div>
 {children}
</div>
)}

