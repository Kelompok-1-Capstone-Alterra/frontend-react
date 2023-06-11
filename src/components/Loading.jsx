export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full bg-primary opacity-10 rounded-full"></div>
        <div className="w-14 h-14 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
