export type Step = "input" | "preview"

export interface StepData {
  businessName: string
  url: string
  qrType: "feedback" | "website"
  uploadedImage: string | null
}

export const validateStepData = (data: StepData): boolean => {
  return !!(data.businessName.trim() && data.url.trim())
}
