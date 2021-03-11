import React, { useState } from 'react'
import { format, isValid } from 'date-fns'

/**
 * checks if all characters in a string are digits.
 * @param candidate
 * @returns boolean
 */
const isDigit = (candidate: string) => {
  return /^\d?$/.test(candidate)
}

const removeNonDigits = (string: string) => {
  return string.replace(/\D/g, '')
}

const App: React.FC = () => {
  const [moneyValue, setMoneyValue] = useState<string>('')

  const [dateValue, setDateValue] = useState<string>('')

  const [statementVisible, setStatementVisible] = useState<boolean>(false)

  const toggleStatement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setStatementVisible(!statementVisible)
  }

  const changeMoneyValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = removeNonDigits(e.currentTarget.value)

    if (!value) {
      setMoneyValue('')
      return
    }

    const mostRecentChar = value.slice(-1)

    if (isDigit(mostRecentChar)) {
      const formattedValue = `$${value}`

      setMoneyValue(formattedValue)
    }
  }

  const changeDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setDateValue(value)
  }

  const changeDateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    const mostRecentChar = e.currentTarget.value.slice(-1)

    if (!isDigit(mostRecentChar)) return

    const valueAsDate = new Date(value)

    if (isValid(valueAsDate)) {
      const formatted = format(valueAsDate, 'yyyy-M-d')

      setDateValue(formatted)
    } else {
      alert('Not a valid date')
    }
  }

  return (
    <Layout>
      <Box>
        <Form>
          <Input
            label="Money Input"
            value={moneyValue}
            onChange={changeMoneyValue}
          />
          <Input
            style={{ marginTop: '5px' }}
            label="Date Input"
            value={dateValue}
            onChange={changeDateInput}
            onBlur={changeDateValue}
          />
          <Button style={{ marginTop: '10px' }} onClick={toggleStatement}>
            {statementVisible ? 'Hide the truth' : 'Tell the truth'}
          </Button>
        </Form>
        {statementVisible ? (
          <Box>
            I will give John {moneyValue} on {dateValue}
          </Box>
        ) : null}
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
  > & { label?: string }

const Input: React.FC<InputProps> = ({ children, label, ...props }) => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <Box>{label}</Box>
      <input {...props} />
    </Box>
  )
}

type FormProps = StyledComponent &
  React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > & {}

const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return (
    <form {...props} style={{ display: 'flex', flexDirection: 'column' }}>
      {children}
    </form>
  )
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
