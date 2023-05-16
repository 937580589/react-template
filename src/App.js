import './app.css'
import {  css } from '@emotion/react'
import A from './A'
const App = () => {
    return <>
        <h2>Nan</h2>
        <div css={css`color: red;`}>111</div>
        <A/>
    </>
}
export default App;