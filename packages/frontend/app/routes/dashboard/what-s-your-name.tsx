import {
  Form,
  useActionData,
  ActionFunction,
  LoaderFunction,
  redirect,
} from "remix";
import { Button } from "~/components/Buttons/Button";
import { ErrorBox } from "~/components/ErrorBox";
import { TextInput } from "~/components/Fields/TextInput";
import { Header } from "~/components/Header";
import { Section } from "~/components/Section";
import { authGuard } from "~/modules/auth/services/auth-guard";
import { changeFullname } from "~/modules/user/services/changeFullname";
import { User } from "~/modules/user/types";
import { validateUserFullname } from "~/modules/user/validators/validate-user-fullname";
import { getSession } from "~/sessions";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export const meta = () => {
  return {
    title: "Progressively | What's your name?",
  };
};

interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const user = await authGuard(request);

  return { user };
};

interface ActionData {
  errors?: {
    fullname?: string;
  };
}

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const formData = await request.formData();
  const fullname = formData.get("fullname")?.toString() || "";
  const session = await getSession(request.headers.get("Cookie"));
  const errors = validateUserFullname(fullname);

  if (errors?.fullname) {
    return { errors };
  }

  await changeFullname(fullname!, session.get("auth-cookie"));

  return redirect("/dashboard");
};

export default function WhatsYourNamePage() {
  const data = useActionData<ActionData>();

  const errors = data?.errors;

  return (
    <DashboardLayout
      header={<Header title="Hey, welcome around! What's your name?" />}
    >
      <Section>
        {errors?.fullname && <ErrorBox list={errors} />}

        <Form method="post">
          <TextInput
            isInvalid={Boolean(errors?.fullname)}
            label="Fullname"
            name="fullname"
            placeholder="e.g: John Doe"
          />

          <Button type="submit">Set my fullname</Button>
        </Form>
      </Section>
    </DashboardLayout>
  );
}
