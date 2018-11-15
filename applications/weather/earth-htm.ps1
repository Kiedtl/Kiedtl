function get-Weather($Location, $UserAgent, $Output, $Pause)
{
	(curl https://wttr.in/$Location -UserAgent "$UserAgent" -o "$Output").Content
	if ($Pause -eq "true") 
	{
		PAUSE
	}
}

$filename = get-random 
get-weather -Location Frederick+Maryland -Output C:/Users/$env:USERNAME/Documents/Weather/reports/$filename-frederick-maryland.htm -Pause false
start C:/Users/$env:USERNAME/Documents/Weather/reports/$filename-frederick-maryland.htm