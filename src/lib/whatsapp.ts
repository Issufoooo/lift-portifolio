export function buildWhatsAppUrl(message: string) {
  // Placeholder: troca depois por +258XXXXXXXXX (sem o + no wa.me)
  const phone = "258876422412";
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
