import { Beam } from "./beam";

export default function Working() {
  return (
    <>
      <div className="mx-auto mb-8 mt-40 max-w-7xl px-10">
        <div>
          <h2 className="text-4xl sm:text-6xl">
            How does it Work? <br />
          </h2>
          <p className="mb-8 mt-3 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Lawson generates its answer based on the pdf and your provided
            information.
          </p>
          <Beam />
        </div>
      </div>
    </>
  );
}
