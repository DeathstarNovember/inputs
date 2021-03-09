import React from 'react'

const App: React.FC = () => {
  return (
    <Layout>
      <Box>
        <Form>
          <Input />
          <Input />
          <Button />
        </Form>
        <Box>text</Box>
      </Box>
    </Layout>
  )
}

export default App

type ButtonProps = StyledComponent &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

type InputProps = StyledComponent &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >

const Input: React.FC<InputProps> = ({ children, ...props }) => {
  return <input {...props} value="" onChange={() => {}} />
}

type FormProps = StyledComponent & {}

const Form: React.FC<FormProps> = ({ children, style }) => {
  return <form style={style}>{children}</form>
}

type LayoutProps = StyledComponent & {}

const Layout: React.FC<LayoutProps> = ({ children, style }) => {
  return (
    <Box
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      {children}
    </Box>
  )
}

type BoxProps = StyledComponent & {}

const Box: React.FC<BoxProps> = ({ children, style }) => {
  return <div style={style}>{children}</div>
}

type StyledComponent = { style?: React.CSSProperties }
