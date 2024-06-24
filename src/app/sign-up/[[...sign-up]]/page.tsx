import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center py-10 dark:bg-[#0A0A0A] dark:text-white">
      <SignUp />
    </div>
  );
}
