import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist', '.git', '.vscode', 'public', 'build']
    }
  },
  presets: [presetUno({ dark: 'class' })],
  transformers: [transformerDirectives()]
})
