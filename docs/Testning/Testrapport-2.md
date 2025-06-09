Date for report: 2024-05-11

Tested system version/branch: feature/higherorlower

Tests has been performed using automated testing with Jest.

Automated tests for issue: [#4](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/4)

Tests performed on higherOrLowerMechanics.js:

Function checkGuess()

![image.png](../uploads/5a3b8facd41f741069eeb3af85c5a4b9/image.png)

function fetchNewArtist()

![image.png](../uploads/3c0c607f5e476ed765703d92136d5ac7/image.png)

function endGame()

![image.png](../uploads/36c0e9c9a7e0001bd86a99a475467e66/image.png)

Results:

![image.png](../uploads/9de350753a61a774446873fcbe0d631f/image.png)

Tests performed on HigherOrLowerUI.js

Function updateUIAfterGuess():

![image.png](../uploads/ff1789766e1cacfd90d3c2734bc9d00f/image.png)

Function hideButtonShowSecondValue():

![image.png](../uploads/b65c13b8f87375601c86c8bf7501cce9/image.png)

Results:

![image.png](../uploads/064f626d9a4705af05ece47de019b39b/image.png)

Tests performed on scoreSystem.js:

function addScore()

![image.png](../uploads/8af83bee382c5ff3e880be29e0b46a99/image.png)

function resetScore():

![image.png](../uploads/c7b864194d1725228be6765e1b30d8b1/image.png)

function getScore():

![image.png](../uploads/3c4b12fc60237a5c1faa224cb6392acc/image.png)

results:

![image.png](../uploads/fb9a099cfcc4836c05e167fd6c57c3b9/image.png)

# Comments

Overall the game mode system is working properly and bugs that occured has been handled. All tests passed. A good thing is that the logic is seperated in classes/modules which makes it easier to test. A thing that could be improved though is to seperate functions to handle less functionallity to better adhere to single responsibility principle.