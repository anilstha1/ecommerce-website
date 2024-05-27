import Profile from "../../components/profile";
import {authOptions} from "../api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth/next";
import {redirect} from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = session?.user;
  return <Profile user={user} />;
}
