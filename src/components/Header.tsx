import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Header = async () => {
  const user = await currentUser();

  const username = user?.username;

  return (
    <header className="w-full h-10 fixed px-8 top-5 flex items-center justify-end">
      {/* <SignedOut>
        <div className="h-full w-20  bg-muted grid place-content-center rounded-md">
          <SignInButton />
        </div>
      </SignedOut> */}

      <SignedIn>
        <p className="px-2"> {capitalizeFirstLetter(username)}</p>

        <UserButton />
      </SignedIn>
    </header>
  );
};
const capitalizeFirstLetter = (str: string | null | undefined): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export default Header;
