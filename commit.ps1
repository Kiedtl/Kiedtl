git add .
$commitmsg = read-host "Enter a commit message"
set-content commitmsg.tmp $commitmsg
git commit -s -F commitmsg.tmp
pause
remove-item commitmsg.tmp
git push origin master

surge ./root kiedtl.surge.sh
surge ./lots lots.kiedtl.surge.sh
pause

