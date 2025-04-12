import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AccessibilityFeaturesTable from './accessibilityFeatures/accessibilityFeaturestable.jsx'
import AccessibilityFeaturesForm from './accessibilityFeatures/accessibilityFeaturesform.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AccessibilityFeaturesForm/>
    <AccessibilityFeaturesTable/>
    <App></App>
  </StrictMode>,
)
