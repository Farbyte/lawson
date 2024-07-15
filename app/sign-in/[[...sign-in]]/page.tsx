import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="-mt-12">
      <div className="mx-auto flex h-[100vh] items-center justify-center">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-black hover:bg-gray-700 transition text-sm normal-case",
            },
          }}
        />
      </div>
    </div>
  );
}
