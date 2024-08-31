import Image from "next/image";

const EmptySearch = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="https://illustrations.popsy.co/amber/late-for-meeting.svg"
        width={200}
        height={200}
        alt="Empty organization"
        className="h-2/5 w-auto"
      />
      <h2 className="mt-6 text-2xl font-semibold">No results</h2>
      <p className="mt-2 text-sm text-muted-foreground">Try searching again</p>
    </div>
  );
};

export default EmptySearch;
