import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    //@ts-ignore
    <div className="w-full min-h-screen flex justify-center items-center py-10 dark:bg-[#181A2A] dark:text-white">
      {/* @ts-ignore */}
      <SignIn />
    </div>
  );
}
