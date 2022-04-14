import './wdyr'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Renderer } from '../src/Renderer'
import form from './form'
import './style.scss'
import { insertThemeStyle, getTheme } from '../src'

async function handleSubmit(values) {
  console.log(values)
}

insertThemeStyle(getTheme(form.themeSettings.theme))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Renderer form={form} autoSave={true} onSubmit={handleSubmit} />
  </StrictMode>
)
