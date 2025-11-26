import { ImageUploadBox } from "./ImageUploadBox";
import { CreateTokenForm } from "./CreateTokenForm";

export default function CreateTokenPage() {
  return (
    <div className="w-full px-4">
      <h1 className="text-2xl font-semibold mb-8 text-white">Create a new meme</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="bg-[#0f141d] border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center">
          <ImageUploadBox />
        </div>

        <div className="space-y-8">
          <CreateTokenForm />

          <section className="bg-[#0f141d] border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-2 text-white">2. Social optional data</h2>
            <p className="text-sm text-zinc-500">Coming soon…</p>
          </section>

          <section className="bg-[#0f141d] border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-2 text-white">3. Advanced</h2>
            <p className="text-sm text-zinc-500">Coming soon…</p>
          </section>
        </div>
      </div>
    </div>
  );
}
