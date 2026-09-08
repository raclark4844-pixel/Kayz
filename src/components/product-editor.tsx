import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, SelectField, Textarea } from "@/components/ui/input";
import { CATEGORIES, LEAD_TIMES, type CategoryId, type LeadTimeId } from "@/lib/catalog";
import { fileToShopImage } from "@/lib/image-file";
import { useShop } from "@/lib/shop-store";

export function ProductStudio() {
  const editor = useShop((s) => s.editor);
  const closeEditor = useShop((s) => s.closeEditor);
  const confirmDelete = useShop((s) => s.confirmDelete);

  if (!editor) return null;

  if (editor.mode === "delete") {
    return (
      <StudioFrame title="Remove from shop" onClose={closeEditor}>
        <p className="text-sm text-muted">
          Remove <span className="text-foreground">{editor.product.name}</span> from the shop?
          This does not affect pieces already in someone’s bag until they refresh.
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="rose"
            className="flex-1"
            onClick={() => void confirmDelete()}
          >
            Delete
          </Button>
          <Button type="button" variant="outline" className="flex-1" onClick={closeEditor}>
            Keep
          </Button>
        </div>
      </StudioFrame>
    );
  }

  return <EditorForm key={editor.mode === "edit" ? editor.product.slug : "add"} />;
}

function EditorForm() {
  const editor = useShop((s) => s.editor);
  const closeEditor = useShop((s) => s.closeEditor);
  const saveProduct = useShop((s) => s.saveProduct);
  const editing = editor?.mode === "edit" ? editor.product : null;

  const [name, setName] = useState(editing?.name ?? "");
  const [price, setPrice] = useState(editing ? String(editing.price) : "");
  const [description, setDescription] = useState(editing?.description ?? "");
  const [image, setImage] = useState(editing?.image ?? "");
  const [leadTime, setLeadTime] = useState<LeadTimeId>(editing?.leadTime ?? "1-week");
  const [category, setCategory] = useState<CategoryId>(editing?.categories[0] ?? "charms");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    try {
      setError(null);
      setImage(await fileToShopImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read that photo.");
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await saveProduct({
        name,
        price: Number(price),
        description,
        image,
        leadTime,
        category,
        slug: editing?.slug,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save that piece.");
      setBusy(false);
    }
  }

  return (
    <StudioFrame title={editing ? "Edit piece" : "Add a piece"} onClose={closeEditor}>
      <form className="space-y-3" onSubmit={(e) => void onSubmit(e)}>
        <Field label="Name">
          <Input id="product-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field label="Price">
          <Input
            id="product-price"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Field>
        <Field label="Description">
          <Textarea
            id="product-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Category">
            <SelectField
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryId)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </SelectField>
          </Field>
          <Field label="Lead time">
            <SelectField
              value={leadTime}
              onChange={(e) => setLeadTime(e.target.value as LeadTimeId)}
            >
              {LEAD_TIMES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </SelectField>
          </Field>
        </div>
        <Field label="Photo">
          <input
            type="file"
            accept="image/*"
            id="product-photo"
            className="block w-full text-sm text-muted file:mr-3 file:h-10 file:rounded-md file:border-0 file:bg-gold file:px-3 file:text-sm file:font-medium file:text-gold-fg"
            onChange={(e) => void onFile(e.target.files?.[0])}
          />
        </Field>
        {image ? (
          <img src={image} alt="" className="aspect-square w-full rounded-md object-cover" />
        ) : null}
        {error ? <p className="text-sm text-rose-deep">{error}</p> : null}
        <Button type="submit" className="w-full" size="lg" disabled={busy || !image}>
          {busy ? "Saving…" : editing ? "Save changes" : "Add to shop"}
        </Button>
      </form>
    </StudioFrame>
  );
}

function StudioFrame({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-overlay" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="studio-title"
        className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-xl bg-background shadow-[0_0_0_1px_rgb(212_175_55/0.22)] md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[28rem] md:max-h-none md:rounded-none"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h2 id="studio-title" className="font-serif text-2xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center text-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="gold-rule mx-5" />
        <div className="flex-1 overflow-y-auto px-5 py-4 pb-8">{children}</div>
      </aside>
    </div>
  );
}
