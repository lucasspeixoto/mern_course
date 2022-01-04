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

.form-control--invalid {
  label,p {
    color: red;
  } 

  p {
    font-size: .7rem;
    margin-top: .2rem;
  }
  
  input, textarea {
    border-color: red;
    background: #ffd1d1;
  }
}


`;
