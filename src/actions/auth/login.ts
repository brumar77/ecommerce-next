"use server";

import { signIn } from "@/auth.config";
import { sleep } from "@/utils";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(3);
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if ((error as any).type === "CredentialsSignin") {
      return "CredentialsSignin";
    }
    return "Error desconocido";
  }
}

export const login = async(email: string, password: string) => {
  try {

    await signIn("credentials", {
      email: email,
      password: password,
    });
    return {
      ok: true,}
    
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: "No se pudo iniciar sesion"
    }
    
  }
};
