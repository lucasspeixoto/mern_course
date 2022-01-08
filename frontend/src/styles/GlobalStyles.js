import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
  box-sizing: border-box;
}

html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
  background: #4d4d4d;
}

::-webkit-scrollbar {
		width: 15px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #9E9E9E;
		border-radius: 20px;
	}
	::-webkit-scrollbar-thumb:hover {
		background-color: #707070;
	}

.slide-in-left-enter {
  transform: translateX(-100%);
}

.slide-in-left-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 200ms;
}

.slide-in-left-exit {
  transform: translateX(0%);
  opacity: 1;
}

.slide-in-left-exit-active {
  transform: translateX(-100%);
  opacity: 0;
  transition: all 200ms;
}

.center {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

main {
  margin-top: 5rem;
}


.form-control {
  margin: 1rem 0;
}

.form-control label,
.form-control input,
.form-control textarea {
  display: block;
}

.form-control label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-control input,
.form-control textarea {
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  background: #f8f8f8;
  padding: 0.15rem 0.25rem;
}

.form-control input:focus,
.form-control textarea:focus {
  outline: none;
  background: #ebebeb;
  border-color: #510077;
}

.form-control--invalid label,
.form-control--invalid p {
  color: red;
}

.form-control--invalid input,
.form-control--invalid textarea {
  border-color: red;
  background: #ffd1d1;
}


`;
