import prismadb from "@/lib/prismadb";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

export default async function Setuplayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {userId} = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId: userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return (
    <>
      <div>This is the ROOT layout...</div>
      {children}
    </>
  );
}
