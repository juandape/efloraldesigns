export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-4xl font-bold">EFloralDesigns</h1>
      <nav className="flex items-center space-x-4">
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
}