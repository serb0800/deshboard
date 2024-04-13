import { AuthError } from "next-auth";
import { signIn } from "../../../auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  "use server";

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
