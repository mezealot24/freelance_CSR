import { z } from "zod";
import { formSchema } from "@/lib/formSchema";
import { scamTypeOptions, platformOptions } from "@/data/platformOptions";

export type FormData = z.infer<typeof formSchema>;

export type ScamType = typeof scamTypeOptions[number]["id"];
export type PlatformType = typeof platformOptions[number]["id"];

export interface Option {
  id: string;
  label: string;
}