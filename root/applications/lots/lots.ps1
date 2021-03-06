param (
    [string]$LogFile = "C:\Users\$env:USERNAME\lots.log",
    [string]$Password,
    [string]$Email,
    [string]$STMP,
    [string]$SrcDir = "Source",
    [switch]$Noisy = $false,
    [switch]$SendEmail = $false,
    [switch]$DelEmail = $false,
    [switch]$DelLogs = $false,
    [switch]$H = $false,
    [switch]$h = $false,
    [switch]$Help = $false,
    [switch]$help = $false,
    [switch]$N = $false,
    [switch]$S = $false,
    [switch]$D = $false,
    [switch]$L = $false

 )

$usr = $env:USERNAME
$date = Get-Date
Set-Location C:\Users\$usr\

###########################################################
#     __  __      _        _____ _                    _
#    |  \/  |__ _(_)_ _   |_   _| |_  _ _ ___ __ _ __| |
#    | |\/| / _` | | ' \    | | | ' \| '_/ -_) _` / _` |
#    |_|  |_\__,_|_|_||_|   |_| |_||_|_| \___\__,_\__,_|
#
###########################################################


# If the -H or the -h or the -Help or the -help flag is specified, 
# print the help message and exit.
if ( $H ) {
	Echo-Help
	exit
}
if ( $h ) {
	Echo-Help
	exit
}
if ( $Help ) {
	Echo-Help
	exit
}
if ( $help ) {
	Echo-Help
	exit
}


# Print the banner
Echo-Banner

# Create two files to log onto 
Set-Content "[VERBOSE] LOTS STARTED $date" $LogFile

# Remove environment variables that might mess up Scoop installation
Remove-Item Env:\SCOOP
Write-Log "Removing SCOOP Environment variable" "verbose"

# Install (Scoop)[http://github.com/lukesampson/scoop.wiki]
Write-Log "Downloading SCOOP installer" "verbose"
Invoke-WebRequest (new-object net.webclient).downloadstring('https://get.scoop.sh') 
Write-Log "Installed Scoop" "verbose"

# Install the 'extras' and the 'main' bucket onto scoop
scoop bucket add extras
scoop bucket add main "http://github.com/lukesampson/scoop.git"
Write-Log "Added `'main`' and `'extras`' bucket" "verbose"

# Install my favorite things
scoop install 7zip git mercurial hub 					# Version control software
scoop install go ruby dotnet 						# Languages: GO, RUBY, .NET
scoop install gcc make cmake 						# Compilation utilities
scoop install emacs vim vscode-portable atom vimtutor 	# My favorite editors for various things
scoop install vivaldi 							# My favorite browser
scoop install figlet shasum touch gitignore 			# CLI utilities
scoop install sudo ln less runat say time 				# CLI utlities
scoop install gpg gpg4win openssh msys2 pandoc 			# Random things
scoop install node npm yarn 						# Dev package managers
scoop install concfg pshazz 						# To cutomize powershell
Write-Log "Installed apps with Scoop" "verbose"

# Download Powershell themes
Invoke-WebRequest http://kiedtl.surge.sh/themes/powershell/concfg/kiedtl.json -o kiedtl-concfg.json
Invoke-WebRequest http://kiedlt.surge.sh/themes/powershell/pshazz/kiedtl.json -o kiedtl-pshazz.json
Write-Log "Downloaded Powershell themes" "verbose"

# Apply Concfg theme
concfg import kiedtl-concfg.json
Write-Log "Applied Concfg theme to Powershell. Please restart Powershell to see the new console." "verbose"

# Move Pshazz theme to desired location
Move-Item kiedtl-pshazz.json phazz/

# Apply Pshazz theme
pshazz use kiedtl-pshazz
Write-Log "Applied Pshazz theme to Powershell" "verbose"

# Create Source Dir for development
Set-Location C:\Users\$usr\
New-Item -Path . -Name "$SrcDir" -ItemType "directory"
Write-Log "Create $SrcDir directory" "verbose"

# Clone projects into Source dir and set them up for development
Set-Location $SrcDir

git clone https://github.com/kiedtl/ravenode.git
git clone https://github.com/kiedtl/invisitext.git
git clone https://github.com/kiedtl/kiedtl.git
git clone https://github.com/kiedtl/bible.git
git clone https://github.com/kiedtl/kombucha.git
Write-Log "Cloned repositories to $SrcDir" "verbose"

Set-Location Ravenode
Write-Log "Preparing to run `'npm install`' and prepare repositories for development" "verbose"
npm install
npm run build

Set-Location ..
Set-Location Kiedtl
npm install
Set-Location ..

# Download script that let me see the weather into ~/Desktop dir
Set-Location ~/Desktop
Invoke-WebRequest http://kiedtl.surge.sh/applications/weather/moon-htm.ps1 -o moon-htm.ps1
Invoke-WebRequest http://kiedtl.surge.sh/applications/weather/moon-console.ps1 -o moon-console.ps1
Invoke-WebRequest http://kiedtl.surge.sh/applications/weather/earth-console.ps1 -o earth-console.ps1
Invoke-WebRequest http://kiedtl.surge.sh/applications/weather/earth-htm.ps1 -o earth-htm.ps1
Write-Log "Downloaded weather scripts to Desktop directory" "verbose"

# Download sendEmail files
Set-Location ~
Invoke-WebRequest http://kiedtl.surge.sh/applications/sendemail/bin/mail.exe -o mail.exe
Invoke-WebRequest http://kiedtl.surge.sh/email-templates/lots-email.htm -o mail.htm
Write-Log "Downloaded sendEmail and email template" "verbose"

# Send the email
if ( $SendEmail ) {
	Get-Content mail.htm | mail.exe -f $Email -t $Email -u LOTS_STATUS -s $SMTP -xu $Email -xp $Password -l mail.log -a "mail.log" lots.log -v -v -v -v -v -v -v -v -v -v -v
}

# Clean up
if ( $DelLogs ) {
	Remove-Item $Logfile
}
if ( $DelEmail ) {
	Remove-Item mail.exe
	Remove-Item mail.htm
	Remove-Item mail.log
}


############################################
#    ___             _   _
#   | __|  _ _ _  __| |_(_)___ _ _  ___
#   | _| || | ' \/ _|  _| / _ \ ' \(_-<
#   |_| \_,_|_||_\__|\__|_\___/_||_/__/
#   
############################################


function Write-Log( $text, $lev ) {
	$level = $lev.ToUpper()
	Add-Content $LogFile "[$level]: $text"
	if ( $Noisy ) {
		Write-Host "[$level]: $text"
	}
}

function Echo-Banner() {
     Write-Host "`t _     ___  ____  ____     ___  _____   _____ _   _ _____"
     Write-Host "`t| |   / _ \|  _ \|  _ \   / _ \|  ___| |_   _| | | | ____|"
     Write-Host "`t| |  | | | | |_) | | | | | | | | |_      | | | |_| |  _|"
     Write-Host "`t| |__| |_| |  _ <| |_| | | |_| |  _|     | | |  _  | |___"
     Write-Host "`t|_____\___/|_| \_\____/   \___/|_|       |_| |_| |_|_____|"
     Write-Host "`t"
     Write-Host "`t          ____   ____ ____  ___ ____ _____ ____"
     Write-Host "`t         / ___| / ___|  _ \|_ _|  _ \_   _/ ___|"
     Write-Host "`t         \___ \| |   | |_) || || |_) || | \___ \"
     Write-Host "`t          ___) | |___|  _ < | ||  __/ | |  ___) |"
     Write-Host "`t         |____/ \____|_| \_\___|_|    |_| |____/   "
     Write-Host "`t                                                  `a"      
}

function Echo-Help() {
	Write-Host "`nUsage: lots.ps1 [-NsDdHh] [-LogFile] [-Password] [-Email] [-SMTP] [-SrSet-Locationir]`r`n"
	Write-Host "`t-N or -Noisy"
	Write-Host "`t`tSets LOTS to output logs to the console as well as to the log file`r`n"
	Write-Host "`t-s or -SendEmail"
	Write-Host "`t`tSets LOTS to send an email to your inbox with the log files.`r`n" 
	Write-Host "`t-SMTP"
	Write-Host "`t`tThe SMTP server and port address to which LOTS connects to to send the email`r`n."
	Write-Host "`t-Password"
	Write-Host "`t`tIf you specify the -SendEmail flag, you must specify this flag to provide the password with which LOTS should connect to the SMTP server.`r`n" 
	Write-Host "`t-Email"
	Write-Host "`t`tSets the email with which LOTS will send the email.`r`n" 
	Write-Host "`t-d or -DelEmail"
	Write-Host "`t`tBy default, LOTS downloads a utility called sendEmail with which it sends the email to you with log files attached. Specify this flag if you want LOTS to delete the utility and its log files afterwards.`r`n" 
	Write-Host "`t-d or -DelLogs"
	Write-Host "`t`tSpecify this flag if you want LOTS to delete its log files after its execution.`r`n" 
	Write-Host "`t-SrSet-Locationir"
	Write-Host "`t`tSpecifies the Source directory which LOTS will create and clone the repositories into.`r`n" 
}