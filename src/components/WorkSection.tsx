// interface WorkSectionProps {}
const WorkSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-[150vh] flex items-start justify-start"
    >
      <div className="bg-foreground w-full ml-2 mr-2 min-h-[150vh] flex flex-col justify-start items-center p-10">
        <div className="w-full">
          <h1 className="text-6xl font-bold text-primary font-[Space-Grotesk-Bold]">
            MY WORKS /
          </h1>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
