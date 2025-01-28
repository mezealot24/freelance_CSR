import { z } from "zod";
import { scamTypeOptions, platformOptions } from "@/data/platformOptions";

const scamTypeIds = scamTypeOptions.map(option => option.id) as [string, ...string[]];
const platformIds = platformOptions.map(option => option.id) as [string, ...string[]];

export const formSchema = z.object({
  ageRange: z.string({
    required_error: "กรุณาเลือกช่วงอายุ"
  }),
  
  province: z.string({
    required_error: "กรุณาเลือกจังหวัด"
  }),
  
  occupation: z.string({
    required_error: "กรุณาระบุอาชีพ"
  })
  .min(2, "อาชีพต้องมีความยาวอย่างน้อย 2 ตัวอักษร")
  .max(50, "อาชีพต้องมีความยาวไม่เกิน 50 ตัวอักษร"),
  
  education: z.string({
    required_error: "กรุณาเลือกระดับการศึกษา"
  }),
  
  hasExperiencedScam: z.enum(["yes", "no"], {
    required_error: "กรุณาเลือกว่าเคยเจอ Scam หรือไม่"
  }).default("no"),
  
  scamTypes: z.array(
    z.enum(scamTypeIds, {
      required_error: "กรุณาเลือกประเภท Scam ที่ถูกต้อง"
    })
  ).default([]),
  
  socialMediaUsage: z.enum(
    ["daily", "weekly", "monthly", "rarely"], {
    required_error: "กรุณาเลือกความถี่ในการใช้งานโซเชียลมีเดีย"
  }),
  
  platforms: z.array(
    z.enum(platformIds, {
      required_error: "กรุณาเลือกแพลตฟอร์มที่ถูกต้อง"
    })
  )
  .min(1, "กรุณาเลือกแพลตฟอร์มที่ใช้งานอย่างน้อย 1 แพลตฟอร์ม")
  .max(6, "เลือกแพลตฟอร์มได้ไม่เกิน 6 แพลตฟอร์ม"),
}).refine(
  (data) => {
    if (data.hasExperiencedScam === "yes") {
      return data.scamTypes.length > 0;
    }
    return true;
  },
  {
    message: "กรุณาเลือกประเภท Scam อย่างน้อย 1 ประเภท",
    path: ["scamTypes"],
  }
);

export type FormSchema = z.infer<typeof formSchema>;