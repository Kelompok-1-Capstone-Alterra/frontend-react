import Button from "../Button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 flex items-center px-3 py-5 bg-primary">
      <p className="text-lg font-bold text-white">Ini Navbar</p>
      <Button variant={"outline-green"} className={"rounded-full"}>
        Click
      </Button>
    </nav>
  );
}
