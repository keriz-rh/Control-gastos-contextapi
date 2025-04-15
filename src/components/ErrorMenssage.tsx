import {PropsWithChildren } from "react"

export default function ErrorMenssage({children} : PropsWithChildren) {
  return (
<p className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-300 p-3 rounded-xl shadow-sm transition-all">
{children}
</p>
  )
}
