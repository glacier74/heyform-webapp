import { Theme } from '@heyui/component'
import { createGlobalStyle, css, ThemeProps } from 'styled-components'

export const GlobalStyle = createGlobalStyle<ThemeProps<Theme>>`
  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    color: ${({ theme }) => theme.text};
    font-size: ${({ theme }) => theme.fontSize};
    line-height: ${({ theme }) => theme.lineHeight};
    font-family: ${({ theme }) => theme.fontFamily};

    @media print {
      background-color: ${({ theme }) => theme.white};
    }
  }

  a {
    color: ${({ theme }) => theme.primary};

    &:hover {
      color: ${({ theme }) => theme.lightPrimary};
    }

    &:active {
      color: ${({ theme }) => theme.darkPrimary};
    }

    &[disabled] {
      color: ${({ theme }) => theme.disabled};
      cursor: not-allowed;
      pointer-events: none
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fontFamily};
    line-height: ${({ theme }) => theme.lineHeight};
  }

  h1 {
    font-size: ${({ theme }) => theme.h1FontSize};
  }

  h2 {
    font-size: ${({ theme }) => theme.h2FontSize};
  }

  h3 {
    font-size: ${({ theme }) => theme.h3FontSize};
  }

  h4 {
    font-size: ${({ theme }) => theme.h4FontSize};
  }

  h5, h6 {
    font-size: ${({ theme }) => theme.fontSize};
  }

  code,
  pre {
    font-family: ${({ theme }) => theme.codeFontFamily};
  }

  .block-menu-trigger {
    display: none !important;
  }

  .hey-multiple-select-panel {
    width: 540px;
    background: #fff;
    box-shadow: 0 3px 12px 2px rgb(55 60 67 / 12%);
  }

  .hey-multiple-select-search {
    .hey-input input {
      height: 40px;
      padding: 10px;
      line-height: 20px;
      background: none;

      &::placeholder {
        color: #b0b7c3;
      }
    }
  }

  .hey-multiple-select-item,
  .hey-multiple-select-create-item {
    height: 40px;
    padding: 0 24px;
    color: #4e5d78;

    &:hover {
      background: #fafbfc;
    }
  }

  .hey-multiple-select-item {
    &.hey-menu-item-checked {
      padding-right: 40px;
    }
  }

  .hey-multiple-select-create-item {
    svg {
      margin-left: 12px;
      margin-right: -4px;
      width: 16px;
      height: 16px;
    }
  }

  .floating-toolbar {
    background: #333;

    .link-editor-button,
    .toolbar-button {
      color: #fff;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  #block-menu-container {
    ol {
      li {
        button:hover {
          background: #fafbfc;
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .hey-menu {
    background: #fff;
    border: none;
    box-shadow: 0 3px 12px 2px rgb(55 60 67 / 12%);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    .hey-menu-item {
      padding-right: 40px;
    }

    .hey-menu-divider {
      margin: 8px 12px;
      padding-top: 1px;
      height: 0;
      background-color: #f3f3f3;
    }
  }

  .hey-menu-item {
    padding: 0 24px;
    height: 36px;

    &:hover {
      background: #fafbfc;
    }

    svg {
      color: #8a94a6;
    }

    &.hey-menu-item-checked {
      color: #4e5d78;

      svg {
        color: #0252d7;
      }
    }
  }

  .hey-form-item-error {
    bottom: 4px;
  }

  .hey-modal-container {
    input {
      border-color: rgba(0,0,0,0.2);
    }

    .hey-modal-description + .hey-flex {
      flex-direction: column;
    }

    .hey-button {
      width: 100%;
      margin-right: 0;
    }

    .hey-button-error {
      margin-bottom: 12px;
      background: transparent;
      color: #eb5757;
    }

    .hey-modal-cancel-button {
      border-color: rgba(0,0,0,0.2);
    }
  }

  .hey-input input {
    border-radius: 3px;
  }

  .hey-textarea textarea {
    border-radius: 3px;
  }
`

export const ScrollBarStyle = () => css`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    background: transparent;
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    width: 6px;
    border-radius: 3px;
    display: none;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    display: none;
  }

  &:hover {
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
      display: block;
    }
  }
`
