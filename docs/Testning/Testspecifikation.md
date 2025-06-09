# Testspecification

The application has been tested using manual and automatic testing. These tests are based off of the provided use cases in this document. The use cases are formed after the issues provided in:

[Issues](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/?sort=created_asc&state=all&first_page_size=20)

## Automated Testing

Automated test cases has been performed using Jest, a JavaScript testing framework. The test code can be found in the following links:

All tests can be found at: https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/tree/main/test?ref_type=heads

[Tests for game mode: guess the song](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/tree/main/test/guessSong?ref_type=heads)

[Tests for game mode: higher or lower](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/tree/main/test/higherOrLower?ref_type=heads)

[Tests for pointsystem](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/blob/main/test/scoreSystem.jsdom.test.js?ref_type=heads)

For a detailed view over the automated tests, check out these links:

[Testreport 2](https://gitlab.lnu.se/1dv613/student/dp222ky/project/-/wikis/Testning/Testrapport%202)

[Testreport 3](https://gitlab.lnu.se/1dv613/student/dp222ky/project/-/wikis/Testning/Testrapport%203)

## Manual Testing

Manual testing has been performed by the user to ensure that each use case is implemented correctly and works as intended. Below, manual testing has been performed on the projects Oauth2 authentication system.

# Use cases:

## Use case 1: User authentication through Spotify. Based off of issue: [#6](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/6 "The application should offer a way for the user to authenticate.")

### Precondition: The user has a Spotify account.

### Main Scenario:

### 1.1. Authentication successful for a first time user.

1. The user wants to authenticate
2. The system redirects to Spotifys authentication service.
3. The user enters their Spotify credentials or chooses to authenticate through another method.
4. Spotify or the chosen service verifies a successful authentication
5. The user is presented with accessibility conditions.
6. The user accepts the conditions.
7. The user is redirected back to the application along with necessary payload.
8. The system verifies the payload, and grants access to the user by redirecting the user to profile page.

### Alternate scenarios:

### 1.2 Authentication successful for an existing user.

1. The user wants to authenticate
2. The system redirects to Spotifys authentication service.
3. The user enters their Spotify credentials or chooses to authenticate through another method.
4. Spotify or the chosen service verifies a successful authentication
5. The user is redirected back to the application along with corresponding payload.
6. The system verifies the payload, and grants access to the user by redirecting the user to profile page.

### 1.3 Authentication failed for a new user, the user declines the conditions

1. The user wants to authenticate
2. The system redirects to Spotifys authentication service.
3. The user enters their Spotify credentials or chooses to authenticate through another method.
4. Spotify or the chosen service verifies a successful authentication.
5. The user is presented with accessibility conditions.
6. The user declines the conditions.
7. The user is redirected back to the application along with necessary payload.
8. The system presents an error page.

### 1.4 Authentication failed for a user, the user did not successfully authenticate using the Spotify service and returns to the application.

1. The user wants to authenticate
2. The system redirects to Spotifys authentication service.
3. The user either inputs incorrect credentials or cancels the login process and returns to the application.
4. The system presents the user with the original home page, the user cant advance.

## Use case 2: Enforcing authenticated user to access application features. Based off of issue: [#8](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/8 "The user has to be authenticated to browse the application.")

### Main Scenario:

### 2.1 Accessing the Profile Page by an authenticated user.

### Precondition: The user is authenticated.

1. The user wants to visit the profile page.
2. The user visits the home page.
3. The system presents the home page, that includes an option to visit the profile page.
4. The user visits the profile page by clicking the navigation option.
5. The user is presented the profile page and its content.

### Alternate Scenarios:

### Precondition: The user is not authenticated.

### 2.2 Unauthenticated user attempts to access profile page.

1. The user wants to visit the profile page
2. The user visits the home page.
3. The system presents the user with no other option than to authenticate
4. The user can not visit the profile page.

### 2.3 Direct URL access attempt to profile page by unauthenticated user:

1. The user wants to visit the profile page
2. The user tries to access the profile page by entering the profile page URL.
3. The system presents the user with an error page, letting the user know that they're unauthorized.

### 2.4 Direct URL access attempt to profile page by logged out user:

1. The user logged out of an authenticated session.
2. The user wants to visit the profile page.
3. The user tries to access the profile page by entering the profile page URL.
4. The system presents the user with an error page, letting the user know that they're unauthorized.

## Use case 3: The system should have atleast one playable gamemode. Based off issue [#2](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/2 "There should be atleast one playable game mode.")

### Precondition: The user has a premium Spotify account.

### Main Scenario:

### 3.1. The game mode higher or lower is presenting next options on correct guess.

1. The user wants to play a game.
2. The user navigates to the application.
3. The user navigates to the game selection page
4. The user wants to play the higher or lower game.
5. The user is presented with options to guess on.
6. The user guesses correctly.
7. The user gets a point.
8. The system presents the user with a new option.

### Alternate Scenarios:

### 3.2. The game mode higher or lower is ending the game on a wrong guess.

1. The user wants to play a game.
2. The user navigates to the application.
3. The user navigates to the game selection page
4. The user wants to play the higher or lower game
5. The user is presented with options to guess on.
6. The user guesses wrongly.
7. The system presents a game over page.

## Use case 4: The user should be able to easily access all their highscores. Based off of issue [**#11**](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/11 "The user should be able to easily access all their highscores.")

### Main Scenario:

### 4.1. The user wants to check all their highscores in one place.

1. The user wants to check out their highscores for all game modes.
2. The user navigates to the application.
3. The user wants to be able to see their highscores at the "profile" page.

# Test Cases

## Test case 1: User Authentication through Spotify. Based off of issue: [#6](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/6 "The application should offer a way for the user to authenticate.")

### Test case 1.1: Authentication successful for a first time user.

Verify that a new user can successfully authenticate using Spotify and browse the application further.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Enter a valid username/email and password in the presented fields.
4. Login in by pressing the presented "Login" button.
5. Accept the accessibility conditions by clicking "Accept" Button.

### Output

User is redirected to their profile page in the application. The system presents the user with the profile page content.

![image.png](uploads/9499eb71c84f755d83fccfa561c44fa2/image.png)

### Test case 1.2: Authentication successful for an existing user.

Verify that an existing user can successfully authenticate using Spotify and browse the application further.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Enter a valid username/email and password in the presented fields.
4. Login in by pressing the presented "Login" button.

### Output

User is redirected to their profile page in the application. The system presents the user with the profile page content.

![image.png](uploads/c1ca3c60c4a5f4f2ad4955cc9600cf3a/image.png)

### Test case 1.3: Authentication failed for a new user, the user declines the conditions

Verify that the system handles the scenario of a user not agreeing to the required terms to use the application.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Enter a valid username/email and password in the presented fields.
4. Login in by pressing the presented "Login" button.
5. Declines the request of agreeing to terms, by pressing the presented "Cancel" button.

### Output

User is redirected to an error page signaling that something went wrong, along with error code 400: Failed to get access token.

![image.png](uploads/a5e749c8e1379421f2a5598231acc28a/image.png)

### Test case 1.4: Authentication failed for a user, the user did not successfully authenticate using the Spotify service and returns to the application.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Doesn't authenticate, and returns to the application.

### Output

User is presented the home page, with no other presented options other than "Log in to Spotify"

![image.png](uploads/b1242b5b93e4861b749e6c7b6cef590d/image.png)

## Test case 2: Enforcing authenticated user to access application features. Based off of issue: [#8](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/8 "The user has to be authenticated to browse the application.")

### Test case 2.1: Accessing the Profile Page by an authenticated user.

Verify that an authenticated user can successfully access the profile page, which is a page that requires authentication to access.

### Input

1. Navigate to the home page for the application.
2. Click on the button "Go to profile".

### Output

User is redirected to their profile page in the application. The system presents the user with the profile page content.

![image.png](uploads/7af385f7a3f61161b1d87e3a954c7e17/image.png)

### Test case 2.2: Access attempt to profile page without authentication.

Verify that a user can not navigate to the profile page without being authenticated.

### Input

1. Navigate to the home page for the application.

### Output

User is presented the home page, with no other presented options other than "Log in to Spotify"

![image.png](uploads/7dc18726e4b6beec7592eb2d4aa8b61c/image.png)

### Test case 2.3: Direct URL access attempt to profile page without authentication.

Verify that the system handles attempts by unauthenticated users trying to access endpoints that require authentication directly via URL.

### Input

1. Navigate to the URL: [http://localhost:3030/spotify-arcade/user/profile](http://localhost:3030/spotify-arcade/user/profile)

### Output

User is redirected to an error page signaling that something went wrong, along with error code 401: Unauthorized.

![image.png](uploads/a305faa28657524bea2e7f946203644a/image.png)

### Test case 2.4: Direct URL access attempt to profile page after having logged out.

Verify that the system handles attempts by logged out users trying to access endpoints that require authentication directly via URL.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Click on button "Log Out"
4. Navigate to the URL: [http://localhost:3030/spotify-arcade/user/profile](http://localhost:3030/spotify-arcade/user/profile)

### Output

User is redirected to an error page signaling that something went wrong, along with error code 401: Unauthorized.

![image.png](uploads/0733a1825b36fef03ac283c34e7a0ea1/image.png)

## Test case 3: The system should have atleast one playable gamemode. Based off of issue: [#2](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/2 "There should be atleast one playable game mode.")

### Test case 3.1: The game mode higher or lower is presenting next options on correct guess.

Verify that the game mode higher or lower is working properly by testing that the user is presented new option and given a point on each correct guess.

### Input

1. Navigate to the home page for the application. https://cscloud7-106.lnu.se/spotify-arcade/
2. Click on button "Log in with Spotify".
3. Navigate to the "Games" menu.
4. Select the game mode "Higher Or Lower"
5. Click the button "Lower" at the second option "Gipsy Kings", first option is "Charlie Puth" with "22636877" followers

### Output

The first option is updated to "Gipsy Kings", with "888838" followers. Score is updated to 1. The second option is updated to "Ben Howard".

![image.png](uploads/2e92f1f5118a0208116c6d035f6a375b/image.png)

### Test case 3.2: The game mode higher or lower is ending the game on a wrong guess.

Verify that the game mode higher or lower is ending the game and presenting a game over page with the current score and highscore.

### Input

1. Navigate to the home page for the application. https://cscloud7-106.lnu.se/spotify-arcade/
2. Click on button "Log in with Spotify".
3. Navigate to the "Games" menu.
4. Select the game mode "Higher Or Lower"
5. Click the button "Higher" at the second option "Tycho", first option is "Gustavo Lima" with "20813340" followers

### Output

The system navigated to a page that presents "Game Over". "Your Score: 0". "High score for higherorlower: 3". And two buttons "Play Again" and "Play Another Game"

![image.png](uploads/a736e41406343bf9db457ce94256bee1/image.png)

## Test case 4: **The user should be able to easily access all their highscores.** Based off of issue: [#11](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/11 "The user should be able to easily access all their highscores.")

### Test case 4.1: The application is presenting the available highscores at the "profile" page.

Verify that the available highscores should be accessible in one place.

### Input

1. Navigate to the home page for the application. https://cscloud7-106.lnu.se/spotify-arcade/
2. Click on button "Log in with Spotify".

### Output

The user is navigated to their profile page. "Welcome to your profile, Duc Anh Pham" is presented. "Your high scores for each game mode: Higher or Lower: 3, Guess the song: 1" is presented. A log out button is presented.

![image.png](uploads/87adffdba08e30984d8cdb9ebf905c8d/image.png)

## Test case 5: **The application should be accessible over the internet.** Based off of issue: [#12](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/12 "The application should be accessible over the internet.")

### Test case 5.1: The application is accessible on Mozilla Firefox.

Verify that the application is available on Mozilla Firefox and presenting the page properly.

### Input

1. Open web browser "Mozilla Firefox" in private mode.
2. Enter the apps URL into the web browsers adress bar. (https://cscloud7-106.lnu.se/spotify-arcade/)

### Output

The user is navigated to the home page application. With an option to log in.

![image.png](uploads/33cf5e35d066cea2bc64dc96fa566ceb/image.png)

### Test case 5.2: The application is accessible on Google chrome.

Verify that the application is available on Google Chrome and presenting the page properly.

### Input

1. Open web browser "Google chrome" in incognito mode.
2. Enter the apps URL into the web browsers adress bar. (https://cscloud7-106.lnu.se/spotify-arcade/)

### Output

The user is navigated to the home page application. With an option to log in.

![image.png](uploads/a6c4aff129fc5bc35fcacbad8c9a7260/image.png)

## Test case 6: The application should use a credible source for game data. Based off of issue [**#7**](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/7 "The application should use a credible source for game data.")

### Test case 6.1: **The system fetches game data from Spotifys web API.**

Verify that the application successfully retrieves and uses game data from Spotifys web APIs endpoints.

### Input

1. Navigate to the home page for the application.
2. Click on button "Log in with Spotify".
3. Navigate to the "Games" menu.
4. Select the game mode "Higher Or Lower"
5. Inspect the application code, along with its logs to confirm that the Spotify web API is being used for fetching artists.

### Output

The console is logging each endpoint being used to fetch each subsequent artist.

![image.png](uploads/07e3d749fdf18abb8ed73d97e18573ac/image.png)

## Test case 7: **The application code should be well structured. Based off of issue** [#9](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/9 "The application code should be well structured")

### Test case 7.1: **Code structure review**.

Verify that the code is well structured and separated into fitting parts.

### Input

1. Open the code repository.
2. Review the code files and directory strucutre.

### Output

The code is divided into modules. Directory files names are descriptive and reflects their contents. The files/folders are seperated into fitting catalogs. The code follows a consistent naming convention.

![image.png](uploads/e085d067a298f683388c42edf2a5a779/image.png)

![image.png](uploads/08a2acc93ad04950129d0394bc9b9ac6/image.png)

## Test case 8: **The source code is following a coding standard. Based off of issue** [#10](https://gitlab.lnu.se/1dv613/student/dp222ky/projects/spotify-arcade/-/issues/10 "The source code is following a coding standard.")

### Test case 8.1: **Running ESLint checks.**

Verify that the source code follows the coding standard defined by the @lnu/eslint-config package and passes all ESLint checks without errors or warnings.

### Input

1. Open the project in visual studio code.
2. Open the terminal in the root directory of the project.
3. Run the command "npm run lint"

### Output

The ESLint process completes without any errors or warnings.

![image.png](uploads/2e8f82ef2bc9e92b01e5f3941ed4ed96/image.png)