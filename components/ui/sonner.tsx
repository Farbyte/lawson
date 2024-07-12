"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-white group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-black dark:group-[.toaster]:text-white dark:group-[.toaster]:border-black",
          description: "group-[.toast]:text-black dark:group-[.toast]:text-white",
          actionButton:
            "group-[.toast]:bg-black group-[.toast]:text-white dark:group-[.toast]:bg-white dark:group-[.toast]:text-black",
          cancelButton:
            "group-[.toast]:bg-white group-[.toast]:text-black dark:group-[.toast]:bg-black dark:group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
