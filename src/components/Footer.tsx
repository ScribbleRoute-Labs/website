export function Footer() {
  return (
    <footer className="w-full py-10 flex flex-col items-center justify-center border-t border-neutral-900">
      <p className="text-xs text-neutral-600 font-mono">
        &copy; {new Date().getFullYear()} ScribbleRoute Labs. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
