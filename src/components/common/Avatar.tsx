import { BLUE, TEAL } from "@/constants/colors";

export function Avatar({ name, size = 8, src }: { name: string; size?: number; src?: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  return src ? (
    <img src={src} alt={name} className={`w-${size} h-${size} rounded-full object-cover`} />
  ) : (
    <div
      className={`w-${size} h-${size} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
      style={{ background: `linear-gradient(135deg, ${BLUE}, ${TEAL})` }}
    >
      {initials}
    </div>
  );
}
