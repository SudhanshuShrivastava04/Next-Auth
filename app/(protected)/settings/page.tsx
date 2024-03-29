import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface SettingsPageProps {}

const SettingsPage: FC<SettingsPageProps> = async ({}) => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
};

export default SettingsPage;
