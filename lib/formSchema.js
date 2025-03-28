import { z } from "zod"

export const formSchema = z.object({
  ageRange: z.string({
    required_error: "กรุณาเลือกช่วงอายุ",
  }),
  province: z.string({
    required_error: "กรุณาเลือกจังหวัด",
  }),
  occupation: z.string().min(1, "กรุณาระบุอาชีพ"),
  education: z.string({
    required_error: "กรุณาเลือกระดับการศึกษา",
  }),
  hasExperiencedScam: z.enum(["yes", "no"], {
    required_error: "กรุณาเลือกว่าเคยเจอ Scam หรือไม่",
  }),
  scamTypes: z.array(z.string()).optional(),
  socialMediaUsage: z.string({
    required_error: "กรุณาเลือกความถี่ในการใช้งานโซเชียลมีเดีย",
  }),
  platforms: z.array(z.string()).min(1, "กรุณาเลือกแพลตฟอร์มที่ใช้งานอย่างน้อย 1 อย่าง"),
})

