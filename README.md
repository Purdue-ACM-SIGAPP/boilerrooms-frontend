# Boiler Rooms Frontend

Expo (React Native) client for the Boiler Rooms API.

#### Install dependencies

```
npm install
```

#### Run App

```
npm start
```

#### Calling local backend from Expo Go

You will need to run the dotnet backend in your computer in localhost

Then do this to find your local IP address:

Mac

```
ipconfig getifaddr en0
```

Windows (on powershell, idk if this works lol)

```
Get-NetIPAddress | Where-Object {$_.AddressFamily -eq 'IPv4' -and $_.PrefixOrigin -eq 'Dhcp'}
```

You will need to create a .env file at root and add this into the .env:

```
API_BASE_URL={Your Local IP and port here}
```
