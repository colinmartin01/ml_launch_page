import apps_logo from '../apps_logo.png';

// Header featuring the Apps Associates Logo 

export default function LogoHeader() {
    return (
      <header className="Logo-header">
          <img src={apps_logo} className="App-logo" alt="logo" />
      </header>
    )
  }