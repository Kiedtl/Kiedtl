function get-Weather($Location, $UserAgent, $Output, $Pause)
{
	(curl https://wttr.in/$Location -UserAgent "$UserAgent" -o "$Output").Content
	if ($Pause -eq "true") 
	{
		PAUSE
	}
}

$filename = get-random
get-weather -Location moon -Output C:/Users/$env:USERNAME/Documents/Weather/reports/$filename-moon.htm -Pause false
start C:/Users/$env:USERNAME/Documents/Weather/reports/$filename-moon.htm