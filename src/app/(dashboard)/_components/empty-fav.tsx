import Image from "next/image";

const EmptyFav = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image
        src="https://illustrations.popsy.co/amber/man-holding-a-heart.svg"
        width={200}
        height={200}
        alt="Empty organization"
        className="h-2/5 w-auto"
      />
      <h2 className="mt-6 text-2xl font-semibold">No Favorites</h2>
      <p className="mt-2 text-sm text-muted-foreground">Try searching again</p>
    </div>
  );
};

export default EmptyFav;
