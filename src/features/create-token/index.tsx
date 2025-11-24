import { ImageUploadBox } from "./ImageUploadBox";

export default function CreateTokenPage() {
  return (
    <div className="w-full px-4">
      {/* Заголовок */}
      <h1 className="text-2xl font-semibold mb-8 text-white">Create a new meme</h1>

      {/* Две колонки */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* ==== ЛЕВАЯ КОЛОНКА — ЗАГРУЗКА КАРТИНКИ ==== */}
        <div className="bg-[#0f141d] border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center">
          <ImageUploadBox />
        </div>

        {/* ==== ПРАВАЯ КОЛОНКА — ФОРМА ==== */}
        <div className="space-y-8">
          {/* Basic data */}
          <section className="bg-[#0f141d] border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-4 text-white">1. Basic data</h2>

            <p className="text-sm text-zinc-400 mb-6">
              Once your coin/token has been minted, all information becomes immutable.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-xl bg-[#121721] border border-zinc-700 px-4 py-3 text-white"
              />

              <input
                type="text"
                placeholder="Ticker"
                className="w-full rounded-xl bg-[#121721] border border-zinc-700 px-4 py-3 text-white"
              />

              <textarea
                placeholder="Description"
                className="w-full rounded-xl bg-[#121721] border border-zinc-700 px-4 py-3 text-white min-h-[100px]"
              />
            </div>
          </section>

          {/* Social */}
          <section className="bg-[#0f141d] border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-2 text-white">2. Social optional data</h2>
            <p className="text-sm text-zinc-500">Coming soon…</p>
          </section>

          {/* Advanced */}
          <section className="bg-[#0f141d] border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-2 text-white">3. Advanced</h2>
            <p className="text-sm text-zinc-500">Coming soon…</p>
          </section>
        </div>
      </div>
    </div>
  );
}
