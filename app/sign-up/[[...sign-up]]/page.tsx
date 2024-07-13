import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="-mt-12">
      <div className="flex mx-auto justify-center items-center h-[100vh]">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                'bg-black hover:bg-gray-700 transition text-sm normal-case',
            },
          }}
          forceRedirectUrl="/chat"
        />
      </div>
    </div>
  );
}