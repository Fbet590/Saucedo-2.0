interface FacebookPixelEvent {
  content_name?: string
  content_category?: string
  content_ids?: string[]
  content_type?: string
  value?: number
  currency?: string
  num_items?: number
  search_string?: string
  status?: string
}

interface Window {
  fbq: (
    type: 'track' | 'trackCustom' | 'init',
    eventName: string,
    params?: FacebookPixelEvent
  ) => void
}
