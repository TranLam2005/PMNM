import { useMemo } from "react";
import { getGSAP } from "@/lib/gsap";

export function useGsapRegister() {
  return useMemo(() => getGSAP(), []);
}