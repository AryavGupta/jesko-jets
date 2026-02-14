export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500">
          JESKO JETS
        </p>
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Jesko Jets. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Instagram", "LinkedIn", "Twitter"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs text-zinc-600 hover:text-white transition-colors duration-300"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
