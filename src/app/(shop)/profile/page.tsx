import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default function ProfilePage() {

    const session = auth();

    if(!session?.user ) {
      redirect("auth/login?returnTo=/perfil");
    }

  return (
    <div>
      <Title title="Perfil" />
    </div>
  );
}
