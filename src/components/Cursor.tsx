interface CursorProps {
  mouseX: number | null;
  mouseY: number | null;
}
const Cursor: React.FC<CursorProps> = ({ mouseX, mouseY }) => {
  return (
    <div
      style={{ left: mouseX ?? -200, top: mouseY ?? -200 }}
      className="block w-20 h-20 z-10 fixed pointer-events-none rounded-full border-2 border-primary transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <div className="w-full h-full rounded-full animate-ping duration-700 bg-primary opacity-75" />
      <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-secondary rounded-full">
        <span className="font-[Space-Grotesk-Bold] text-xs text-foreground">
          Open
        </span>
      </div>
    </div>
  );
};

export default Cursor;
