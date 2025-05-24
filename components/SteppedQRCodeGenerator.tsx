"use client"

import { useState } from "react"
import InputStep from "./InputStep"
import PreviewStep from "./PreviewStep"
import ResponsiveTemplateSelector from "./ResponsiveTemplateSelector"
import AnalyticsDashboard from "./AnalyticsDashboard"
import type { Step, StepData } from "@/lib/steps"
import type { QRCustomization } from "@/lib/customization"

export default function SteppedQRCodeGenerator() {
  const [currentStep, setCurrentStep] = useState<Step>("input")
  const [showTemplates, setShowTemplates] = useState(false)
  const [stepData, setStepData] = useState<StepData>({
    businessName: "",
    url: "",
    qrType: "feedback",
    uploadedImage: null,
  })

  const handleNext = () => {
    setCurrentStep("preview")
  }

  const handleBack = () => {
    setCurrentStep("input")
  }

  const applyTemplate = (templateCustomization: Partial<QRCustomization>) => {
    // Templates can also update step data if needed
    setShowTemplates(false)
  }

  return (
    <>
      {currentStep === "input" && (
        <InputStep
          data={stepData}
          onDataChange={setStepData}
          onNext={handleNext}
          onShowTemplates={() => setShowTemplates(true)}
        />
      )}

      {currentStep === "preview" && <PreviewStep data={stepData} onBack={handleBack} />}

      {/* Template Selector */}
      <ResponsiveTemplateSelector
        onSelectTemplate={applyTemplate}
        isVisible={showTemplates}
        onClose={() => setShowTemplates(false)}
      />

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />
    </>
  )
}
