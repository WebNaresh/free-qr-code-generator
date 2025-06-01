export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, properties)
    }
}

export const trackQRCodeGeneration = (type: string, customization: Record<string, any>) => {
    trackEvent('qr_code_generated', {
        type,
        ...customization
    })
}

export const trackTemplateUsage = (templateName: string) => {
    trackEvent('template_used', {
        template_name: templateName
    })
}

export const trackDownload = (format: string) => {
    trackEvent('qr_code_downloaded', {
        format
    })
}

declare global {
    interface Window {
        gtag: (
            command: string,
            action: string,
            params?: Record<string, any>
        ) => void
    }
}
