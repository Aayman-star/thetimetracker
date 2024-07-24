import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Header = async () => {
  const user = await currentUser();
  // console.log(user?.username, user?.id);
  const username = user?.username;

  return (
    <>
      <header className="hidden w-full h-10 fixed px-8 top-5 md:flex md:items-center md:justify-end">
        <SignedOut>
          <div className="h-full w-20  bg-muted grid place-content-center rounded-md">
            <SignInButton mode="modal" />
          </div>
        </SignedOut>

        <SignedIn>
          <p className="px-2"> {capitalizeFirstLetter(username)}</p>
          <UserButton />
        </SignedIn>
      </header>
      <header className="md:hidden w-full py-5 px-4 bg-background border-b-[1px] border-muted-foreground/50">
        <SignedOut>
          <div className="bg-muted px-2 py-1 w-20 grid place-content-center rounded ml-auto">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center justify-end">
            <p className="px-2"> {capitalizeFirstLetter(username)}</p>
            <UserButton />
          </div>
        </SignedIn>
      </header>
    </>
  );
};
const capitalizeFirstLetter = (str: string | null | undefined): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export default Header;
