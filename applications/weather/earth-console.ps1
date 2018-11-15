function print-Weather($Location, $UserAgent, $Output)
{
	(curl https://wttr.in/$Location -UserAgent "$UserAgent" -o "$Output").Content
	PAUSE
}

print-weather Frederick+Maryland curl 