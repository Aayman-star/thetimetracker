import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="w-full lg:max-w-4xl lg:mx-auto min-h-[95vh] grid place-content-center">
      <SignIn />
    </div>
  );
};
export default Page;
