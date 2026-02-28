New-Item -ItemType Directory -Force -Path "c:\app\PersonalBlog\public\lanyard"
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/card.glb" -OutFile "c:\app\PersonalBlog\public\lanyard\card.glb"
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/lanyard.png" -OutFile "c:\app\PersonalBlog\public\lanyard\lanyard.png"
