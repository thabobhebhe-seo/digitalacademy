import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in learning more about Digital Skills Academy courses."
    );
    window.open(`https://wa.me/263777123456?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      data-testid="button-whatsapp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
}
