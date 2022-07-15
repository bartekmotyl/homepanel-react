Configuration consists of three files: 
- `connectors.config.js`
- `devices.config.js`
- `dashboard.config.js`

By default configuration is loaded from `config` folder, but this can be changed using environment  variable `REACT_APP_CONFIG_FOLDER_PATH`, for example: `set REACT_APP_CONFIG_FOLDER_PATH=config/minimal` (on unix/macos) or  `$env:REACT_APP_CONFIG_FOLDER_PATH=config/minimal` on Windows (Powershell). 