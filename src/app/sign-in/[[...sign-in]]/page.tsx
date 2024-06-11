import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    //@ts-ignore
    <div className="flex justify-center items-center my-10">
      {/* @ts-ignore */}
      <SignIn />
    </div>
  );
}
