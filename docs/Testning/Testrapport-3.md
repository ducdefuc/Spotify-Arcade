Date for report: 2024-05-18

Tested system version/branch: test/guessSong

Tests has been performed using automated testing with Jest.

Automated tests for issue: [#5](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/5)

Tests performed on guessSongMechanics.js:

function playSongPreview():

![image.png](../uploads/980e6612e34d52053ccde6aba0fb9cc7/image.png)

function pauseSongPreview():

![image.png](../uploads/01c5e7fc9cb746e23e7a2b2c77c02042/image.png)

function resumeSongPreview():

![image.png](../uploads/42601ec77eb1095b51f62586f50ab740/image.png)

function checkGuess():

![image.png](../uploads/5fe548536008a991867e21e1c7fd9506/image.png)

function fetchNewTrack():

![image.png](../uploads/92fcea91162598474642da68ad1dc921/image.png)

Function endGame()

![image.png](../uploads/599157c63fb203e92bf265f9221b4e8f/image.png)

Results:

![image.png](../uploads/73d71c131caec28258fda72bf4824205/image.png)

Tests performed on guessSongUI.js:

function updateSong():

![image.png](../uploads/52bd98ed807963b7945b411a99770bf2/image.png)

function togglePlayPause():

![image.png](../uploads/3cec5cf6285f9810ea94b3954b666c5b/image.png)

Results:

![image.png](../uploads/8b77b2b0f5376a10d0570e76610bd76c/image.png)

# Comments

All tests are passing, bugs that occured has been handled. Improvements: The game mode is currently ending the game after user is guessing wrong without showing which song was the correct answer.