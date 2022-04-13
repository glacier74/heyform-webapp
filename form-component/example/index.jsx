import './wdyr'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Renderer } from '../src/Renderer'
import form from './form'
import './style.scss'
import { getThemeStyles } from '../src'

async function handleSubmit(values) {
  console.log(values)
}

const themeStyles = getThemeStyles(form.themeSettings.theme)
const style = document.createElement('style')
style.innerHTML = themeStyles
document.head.appendChild(style)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Renderer form={form} autoSave={true} onSubmit={handleSubmit} />
  </StrictMode>
)
